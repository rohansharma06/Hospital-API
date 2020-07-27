const express = require("express");
const port = 8000;
const app = express();

const db = require("./config/mongoose");

const bodyParser = require("body-parser");
const config = require("config");
const morgan = require("morgan");

//---- require passport ans jwt strategy for authentication
const passport = require("passport");
const passportJWT = require("./config/passport-jwt-strategy");

//don't show the log when it is test
if (config.util.getEnv("NODE_ENV") !== "test") {
  //use morgan to log at command line
  app.use(morgan("combined"));
}

//---- to fetch data from url

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));

//---- tell app to use passport
app.use(passport.initialize());

//--- use express router
app.use("/", require("./routes"));

//---- starting server
app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server:", err);
    return;
  }
  console.log("Server is up and runinng at port: ", port);
});

module.exports = app;
