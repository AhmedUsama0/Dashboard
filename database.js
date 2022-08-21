const mongoose = require("mongoose");

module.exports = function () {
  mongoose.connect("mongodb://127.0.0.1:27017/dashboard");
};

mongoose.connection.once("open", function () {
  console.log("Connection is made");
});
