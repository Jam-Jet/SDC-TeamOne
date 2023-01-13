// sudo npm install -g loadtest
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const cluster = require("cluster");
const os = require("os");

const numCpu = os.cpus().length;
console.log("num of cpus: ", numCpu);

const config = require("./config")[process.env.NODE_ENV || "dev"];
const PORT = config.port;

const pool = new Pool({
  connectionString: config.connectionString,
});
pool.connect();

const app = express();
app.use(cors());
app.use(express.json());

//CLUSTER SETUP
if (cluster.isMaster) {
  for (let i = 0; i < numCpu; i++) {
    cluster.fork();
    console.log(`forked ${i}`);
  }
} else {
  app.listen(PORT, () =>
    console.log(
      `Our app is running on port: ${PORT}.... 🚀 server process: ${process.pid} @ http://localhost:3003`
    )
  );
}

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
