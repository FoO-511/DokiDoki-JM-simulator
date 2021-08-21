const express = require("express");
const app = express();
const api = require("./routes/index");
const PORT = process.env.PORT || 4000;

app.use("/api", api);

app.get("/test", (req, res) => {
  res.send({ test: "this is test" });
});

app.listen(PORT, () => {
  console.log(`Server run: http://localhost:${PORT}`);
});
