var express = require('express');
var router = express.Router();
const houses_controllers = require("../controllers/houses_controllers");
const { checkLoginPropietario, checkLoginCliente, checkDatetime, decodificar } = require('../auth/auth')

router.get("/", houses_controllers.search_all_houses);

router.post("/create_house", checkLoginPropietario, houses_controllers.create_house)

module.exports = router;