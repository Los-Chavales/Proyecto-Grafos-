var express = require('express');
var router = express.Router();
const places_controllers = require("../controllers/places_controllers");
const { checkLoginPropietario, checkLoginCliente, checkDatetime, decodificar } = require('../auth/auth')

//Crear registros de los lugares
router.post("/create_place", checkLoginCliente, places_controllers.create_place)

module.exports = router;