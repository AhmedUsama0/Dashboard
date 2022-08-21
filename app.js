const express = require("express");
const routes = require("./routes");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"), routes);

app.listen(5000);
