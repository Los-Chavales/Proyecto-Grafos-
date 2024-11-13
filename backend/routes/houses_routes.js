var express = require('express');
var router = express.Router();
const houses_controllers = require("../controllers/houses_controllers");

router.get("/", houses_controllers.search_all_houses);

module.exports = router;
