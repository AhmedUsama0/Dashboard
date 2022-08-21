const connect = require("../database");
const User = require("../models/users");
connect();
const dashboardView = (req, res) => {
  res.render("database");
};

const userView = (req, res) => {
  User.find({ _id: req.body.id }).then((userData) => {
    res.send(userData);
  });
};

const studentView = (req, res) => {
  User.find({ Role: "Student" }).then((students) => {
    res.send(students);
  });
};

const teacherView = (req, res) => {
  User.find({ Role: "Teacher" }).then((teachers) => {
    res.send(teachers);
  });
};

const destroy = (req, res) => {
  User.findOneAndRemove({ _id: req.body.id }).then(() => {
    res.end();
  });
};
module.exports = {
  dashboardView,
  userView,
  studentView,
  teacherView,
  destroy,
};
