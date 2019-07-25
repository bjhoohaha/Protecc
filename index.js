const express = require("express");
const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { spawn } = require("child_process");
// use express as router
const app = express();
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());
// port 4000
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

let runPyrebase = null;

app.post("/capture", function(req, res) {
  // spawn pyrebase
  runPyrebase = spawn("python3", ["PyrebaseAdmin.py"]);
  res.send("waiting");
  runPyrebase.stdout.on("data", data => {
    res.send("spawn success");
  });
  // send error if failed to spawn
  runPyrebase.on("error", err => {
    res.status(500).send({ error: "tshark failed to spawn" });
  });
});

app.delete("/capture", function(req, res) {
  //send response after killed
  runPyrebase.kill().then(res.send("tshark stopped"));
});
