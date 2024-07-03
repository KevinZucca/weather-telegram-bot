const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

// bot
require("./config/bot");

app.use(express.json());

app.listen(port, () => {
  console.log("server is running on port", port);
});
