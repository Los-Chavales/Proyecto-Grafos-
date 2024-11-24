var express = require('express');
var router = express.Router();
const router_controllers = require("../controllers/routes_controllers");

//Ver la mejor casa
router.get("/winning_house", router_controllers.winning_house)

//Ver todas las relaciones
router.post("/", router_controllers.see_all_relationships)

//Crear una relación casa a lugar (actual)
router.post("/create_route", router_controllers.create_route)

//Relacionar una casa con un lugar
router.post("/check_relation", router_controllers.check_relationship)

//Relacionar una casa con un lugar
router.post("/relation_route", router_controllers.relate_house_and_place)

module.exports = router;