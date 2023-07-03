require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const router = require("./api/routes");
const appDataSource = require("./api/models/dataSource");

const app = express();

app.use(cors());
app.use(logger("combined"));
app.use(express.json());
app.use(router);

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
