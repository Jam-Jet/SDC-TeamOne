const express = require("express");
const cors = require("cors");
const { Client, Pool } = require("pg");

const config = require("./config")[process.env.NODE_ENV || "dev"];
console.log('config',config);
const PORT = config.port;

const client = new Client({
  connectionString: config.connectionString
});

client.connect();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  
  res.send("Hello World!");
});




app.listen(PORT, () => {
  console.log(`Our app is running on port: ${PORT}`);
});
