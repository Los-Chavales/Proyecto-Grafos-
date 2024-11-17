var express = require('express');
var router = express.Router();
const houses_controllers = require("../controllers/houses_controllers");
const { checkLoginPropietario, checkLoginCliente, checkDatetime, decodificar } = require('../auth/auth')

router.get("/", houses_controllers.search_all_houses);

//Hacer que un propietario pueda ver sus casas registradas

router.get("/see_your_houses", checkLoginPropietario, houses_controllers.search_all_houses_owner);

//Crear una casa como propietario

router.post("/create_house", checkLoginPropietario, houses_controllers.create_house)

module.exports = router;