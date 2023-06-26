require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { DataSource } = require("typeorm");

const app = express();

app.use(cors());
app.use(logger("combined"));
app.use(express.json());

const appDataSource = new DataSource({
    type: process.env.DB_CONNECTION,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

app.listen(3000, function () {
    console.log("server listening on port 3000");
});

appDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });

app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
});
