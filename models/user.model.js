const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    dealer: {
      type: String,
      default: "none", // type = A,B,C
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  })
);

module.exports = User;
