const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  Name: String,
  Age: Number,
  Gender: String,
  Email: String,
  About: String,
  Day: Number,
  Month: String,
  Year: Number,
  Address: String,
  Role: String,
  Img: String,
});


module.exports = mongoose.model("User",userSchema);