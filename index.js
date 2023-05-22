const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");
require("dotenv").config();
const routesAuth = require("./routes/auth");
const routesTasks = require("./routes/tasks");
connectToMongo();

const app = express();
// const port = process.env.PORT || 5000;
const port = 5000;

app.use(cors());

// Available routes

app.use(express.json());
// app.use(require("./routes/auth"));
app.use(require("./routes/tasks"));

// app.use("/api/auth", routesAuth);
app.use("/api/tasks", routesTasks);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("listening app at", `http://localhost:${port}`);
});
