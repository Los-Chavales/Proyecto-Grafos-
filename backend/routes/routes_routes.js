var express = require('express');
var router = express.Router();
const router_controllers = require("../controllers/routes_controllers");

//Relacionar una casa con un lugar
router.post("/check_relation", router_controllers.check_relationship)

//Relacionar una casa con un lugar
router.post("/relation_route", router_controllers.relate_house_and_place)

module.exports = router;