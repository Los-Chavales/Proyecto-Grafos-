var express = require('express');
var router = express.Router();
const router_controllers = require("../controllers/routes_controllers");

router.post("/relation_route", router_controllers.relate_house_and_place)

module.exports = router;