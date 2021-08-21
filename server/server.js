const express = require("express");
const app = express();
const api = require("./routes/index");
const PORT = process.env.PORT || 4000;
const fs = require("fs");

app.use("/api", api);

app.get("/api/write", (req, res) => {
  try {
    fs.appendFileSync("test.txt", `${req.param("test")}\n`, "utf-8");
    res.send("success");
  } catch (e) {
    console.log(e);
  }
});

app.get("/api/read", (req, res) => {
  const data = fs.readFileSync("test.txt", "utf-8");
  res.send(data);
});

app.get("/api/checkCookie", (req, res) => {
  if (req.param("cookie") === "CASPER{I_@M_M1n1BE1l}") {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.listen(PORT, () => {
  console.log(`Server run: http://localhost:${PORT}`);
});
