var express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var app = express();
var userRoutes = require("./routes/user");
var prodRoutes = require("./routes/prods");
port = 3000;
app.use(bodyParser.json());
var corsOptions = {
  origin: "http://localhost:4200",
  optionsSuccessStatus: 200,
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  ),
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, DELETE, OPTIONS"
    );
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(cors(corsOptions));
app.use("/api/prods", prodRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
