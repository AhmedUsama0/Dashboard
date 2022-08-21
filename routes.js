const dashboardController = require("./Controllers/dashboardController");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const express = require("express");
const router = express.Router();

router.get("/database", dashboardController.dashboardView);
router.get("/student", dashboardController.studentView);
router.get("/teacher", dashboardController.teacherView);
router.post("/database", urlencodedParser, dashboardController.userView);
router.delete("/delete", urlencodedParser, dashboardController.destroy);


module.exports = router;