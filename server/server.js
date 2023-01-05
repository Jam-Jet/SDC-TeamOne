const express = require("express");
const cors = require("cors");
const { Client } = require("pg");

const config = require("./config")[process.env.NODE_ENV || "dev"];
console.log("config", config);
const PORT = config.port;

const client = new Client({
  connectionString: config.connectionString,
});

client.connect();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  client.query('SELECT * FROM users')
  .then(result=> {
      res.status(200).send(result.rows)
  })
  .catch(err=>{res.status(400).send('cannot get users')})
});

app.post('/addGuest', (req, res)=>{
  let user = req.body;
  let name = user.name;
  let queryString = "INSERT INTO users(name) VALUES($1)"
  client.query(queryString, [name, name])
  .then(result=>{
      res.status(200).send('user added successfully')
  })
  .catch(err=>{res.status(400).send('cant add user')})
})





app.listen(PORT, () => {
  console.log(`Our app is running on port: ${PORT}`);
});
