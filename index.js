const express = require("express");
const app = express();
const bodyParser = require("body-parser");
let port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// require("./routes/routers")(app);

app.listen(port, () => {
  console.log(`server run port ${port}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Server is successed." });
});
