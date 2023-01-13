const express = require("express");
const cors = require("cors");
const WebSocket = require("ws");
const { Pool } = require("pg");

const config = require("./config")[process.env.NODE_ENV || "dev"];

const app = express();
const PORT = config.port;
const pool = new Pool({
  connectionString: config.connectionString,
});

app.use(cors());
app.use(express.json());
pool.connect();

// ------------------------------ ROUTES ------------------------------ //

app.get("/", (req, res) => {
  res.send(`Hello World!... assigned to worker ${process.pid}`);
});

app.get("/users", (req, res) => {
  pool
    .query("SELECT * FROM users")
    .then((result) => {
      console.log(`/users request assigned to worker ${process.pid}`);
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(400).send("cannot get users");
    });
});

app.get("/last100messages", (req, res) => {
  pool
    .query(
      `SELECT * FROM (SELECT * FROM messages ORDER BY message_id DESC limit 100) subquery ORDER BY message_id ASC`
    )
    .then((result) => {
      console.log(`/last100Messages request assigned to worker ${process.pid}`);
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(400).send("cannot get messages");
    });
});

app.get("/last50messages", (req, res) => {
  pool
    .query(
      `SELECT * FROM (SELECT * FROM messages ORDER BY message_id DESC limit 50) subquery ORDER BY message_id ASC`
    )
    .then((result) => {
      console.log(`/last50Messages request assigned to worker ${process.pid}`);
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(400).send("cannot get messages");
    });
});

app.post("/addGuest", (req, res) => {
  let name = req.body.name;
  let queryString = "INSERT INTO users(name) VALUES($1) RETURNING *";
  pool
    .query(queryString, [name])
    .then((result) => {
      console.log(`/addGuest request assigned to worker ${process.pid}`);
      res.json({ user_id: result.rows[0].user_id });
    })
    .catch((err) => {
      res.status(400).send("cant add user");
    });
});

app.post("/addMessage", (req, res) => {
  let message = req.body.message;
  let send_date = req.body.send_date;
  let username = req.body.username;
  let queryString =
    "INSERT INTO messages(message, send_date, username) VALUES ($1, $2, $3)";
  pool
    .query(queryString, [message, send_date, username])
    .then((result) => {
      console.log(`/addMessage request assigned to worker ${process.pid}`);
      res.status(200).send(`message added successfully`);
    })
    .catch((err) => {
      res.status(400).send(`Error: ${err}`);
    });
});

// ---------------------- WEB SOCKET CONFIG ------------------------- //

//Defines app server for Websocket to connect to
const server = app.listen(PORT, () => {
  console.log(
    `Our app is running on port: ${PORT}.... 🚀 server ${process.pid} @ http://localhost:3003`
  );
});

//Websocket Server - connects into app server^^^
const wss = new WebSocket.Server({ server });

//Stores connected users
const users = new Set();

//Sends each WS message to all users in the "users" set
function sendMessage(message) {
  users.forEach((user) => {
    user.ws.send(JSON.stringify(message));
  });
}

//Websocket initial connection configuration - runs every time a new user enters chat
wss.on("connection", (ws) => {
  const userRef = {
    ws,
  };
  users.add(userRef);

  //Runs everytime a message is sent in chat
  ws.on("message", (message) => {
    try {
      //Parses incoming message
      const data = JSON.parse(message);

      //Builds message object
      const messageToSend = {
        username: data.username,
        message: data.message,
        send_date: new Date(),
      };

      //Adds data to database
      let queryString =
        "INSERT INTO messages(message, send_date, username) VALUES ($1, $2, $3)";
      pool
        .query(queryString, [
          messageToSend.message,
          messageToSend.send_date,
          messageToSend.username,
        ])
        .then((result) => {
          console.log("Message stored in database");
          console.log(messageToSend);
        })
        .catch((err) => {
          console.log("Failed", err);
        });

      //Send to all users
      sendMessage(messageToSend);
    } catch (e) {
      console.error("Error passing message!", e);
    }
  });

  ws.on("close", (code, reason) => {
    users.delete(userRef);
    console.log(`Connection closed: ${code} ${reason}!`);
  });
});
