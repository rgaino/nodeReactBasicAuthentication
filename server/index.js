//Setting up database connection
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "mysql://root:hYhzHh8LrXTcZXcWbbppAgrg@127.0.0.1:3306/fregues-dev"
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

//Setting up Express routing
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Olá mundão");
});

app.listen(5000);
