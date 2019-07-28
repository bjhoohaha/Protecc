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
  const uid = req.body.uid;
  const count = req.body.count;
  const filter = req.body.filter;

  const arr = [uid];

  if (count.length != 0) arr.push(count);
  if (filter.length != 0) arr.push(filter);

  runPyrebase = spawn("./dist/PyrebaseAdmin", arr);
  // send error if failed to spawn
  runPyrebase.on("error", err => {
    res.status(500);
    res.end();
  });
  // send error if script failed
  runPyrebase.stderr.on("data", err => {
    res.status(400);
    res.end();
  });
  // send 200 OK if successful
  runPyrebase.stdout.on("data", data => {
    res.status(200);
    res.end();
  });
});

app.delete("/capture", function(req, res) {
  // send response after killed
  try {
    runPyrebase.kill().then(res.send("tshark stopped"));
  } catch (err) {
    console.log(err);
  }
});
