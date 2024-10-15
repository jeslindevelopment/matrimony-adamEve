const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
global.__SERVERDIR = path.join(process.cwd(), __dirname);
const config = require("./config");
const swagger = require("./swagger");
const crypto = require('crypto');
config.host = process.env.HOST || "127.0.0.1";
if (!config.port) {
  config.port = process.env.PORT || 8000;
}
const app = (global.app = express());
const server = require("http").Server(app);

/*
app.use('/a',express.static('/b'));
Above line would serve all files/folders inside of the 'b' directory
And make them accessible through http://localhost:3000/a.
*/
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(cors());

swagger(app);

app.set("port", config.port);

let { connectAllDatabase } = require("./models");
connectAllDatabase();

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json({ limit: "50mb" })); // support json encoded bodies
app.use("/api", require("./routes/")); // routes

app.get("/", (req, res) => {
  res.send("Hello, Apis are running!");
});
// Listen the server
server.listen(config.port, config.host);
//server.setTimeout(500000);
console.log("Server listening on " + config.host + ":" + config.port); // eslint-disable-line no-console
