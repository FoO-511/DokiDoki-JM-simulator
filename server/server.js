const express = require("express");
const app = express();
const api = require("./routes/index");
const PORT = 4000;
const fs = require("fs");

app.use("/api", api);

// | act | cip | data | time |

app.get("/api/write", (req, res) => {
  const tmp = new Date().toString();
  try {
    fs.appendFileSync(
      "logs.md",
      `| writing | ${req.param("cip")} | ${req.param("test")} | ${tmp} |\n`,
      "utf-8"
    );
  } catch (e) {
    console.log(e);
  }

  try {
    fs.appendFileSync("test.txt", `${req.param("test")}\n`, "utf-8");
    res.send("success");
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/read", (req, res) => {
  const tmp = new Date().toString();
  try {
    fs.appendFileSync(
      "logs.md",
      `| reading links | ${req.param("cip")} | | ${tmp} |\n`,
      "utf-8"
    );
  } catch (e) {
    console.log(e);
  }
  const data = fs.readFileSync("test.txt", "utf-8");
  res.send(data);
});

app.get("/api/read-log", (req, res) => {
  const data = fs.readFileSync("logs.md", "utf-8");
  res.send(data);
});

app.get("/api/checkCookie", (req, res) => {
  const tmp = new Date().toString();
  try {
    fs.appendFileSync(
      "logs.md",
      `| checking cookie | ${req.param("cip")} | | ${tmp} |\n`,
      "utf-8"
    );
  } catch (e) {
    console.log(e);
  }

  if (req.param("cookie") === "CASPER{I_@M_M1n1BE1l}") {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.listen(PORT, () => {
  console.log(`Server run: http://localhost:${PORT}`);
});

function erase() {
  try {
    fs.writeFileSync("test.txt", "", "utf-8");
    console.log("erased");
  } catch (e) {
    console.log(e);
  }
}

let timerId = setInterval(erase, 1800000);
