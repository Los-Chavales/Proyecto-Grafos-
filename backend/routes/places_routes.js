var express = require('express');
var router = express.Router();
const places_controllers = require("../controllers/places_controllers");
const { checkLoginPropietario, checkLoginCliente, checkDatetime, decodificar } = require('../auth/auth')

//Mostrar todos los lugares

router.get("/", places_controllers.search_all_places);

//Hacer que un cliente vea sus lugares registrados

router.get("/see_your_places", checkLoginCliente, places_controllers.search_all_places_client);

//Crear registros de los lugares
router.post("/create_place", places_controllers.create_place)

module.exports = router;