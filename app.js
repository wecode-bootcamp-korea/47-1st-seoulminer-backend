// require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { DataSource } = require("typeorm");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(logger("combined"));
app.use(express.json());

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.listen(3000, async () => {
  console.log("server listening on port 3000");
  await appDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err);
    });
});

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});
