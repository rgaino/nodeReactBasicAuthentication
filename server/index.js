const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Olá mundão");
});

app.listen(5000);
