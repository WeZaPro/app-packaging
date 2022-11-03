const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const db = require("./models");
const Role = db.role;
let port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// init routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

app.listen(port, () => {
  console.log(`server run port ${port}`);
});

app.get("/", (req, res) => {
  res.json({ message: "Server is successed." });
});

// MongoDb
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "superUser",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'superUser' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
