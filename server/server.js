const express = require("express");
const cors = require("cors");
const { Client } = require("pg");

const config = require("./config")[process.env.NODE_ENV || "dev"];

const app = express();
const PORT = config.port;
const client = new Client({
  connectionString: config.connectionString,
});

app.use(cors());
app.use(express.json());
client.connect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  client
    .query("SELECT * FROM users")
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(400).send("cannot get users");
    });
});

app.get("/messages", (req, res) => {
  client
    .query("SELECT * FROM messages")
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(400).send("cannot get messages");
    });
});

app.get("/last1000messages", (req, res) => {
  client
    .query(
      `SELECT * FROM (SELECT * FROM messages ORDER BY message_id DESC limit 1000) subquery ORDER BY message_id ASC`
    )
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((err) => {
      res.status(400).send("cannot get messages");
    });
});

app.post("/addGuest", (req, res) => {
  let name = req.body.name;
  let queryString = "INSERT INTO users(name) VALUES($1) RETURNING *";
  client
    .query(queryString, [name])
    .then((result) => {
      res.json(result.rows[0].user_id);
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
  client
    .query(queryString, [message, send_date, username])
    .then((result) => {
      res.status(200).send(`message added successfully`);
    })
    .catch((err) => {
      res.status(400).send("cant add message");
    });
});

app.listen(PORT, () => {
  console.log(`Our app is running on port: ${PORT}`);
});
