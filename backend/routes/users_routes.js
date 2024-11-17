var express = require('express');
var router = express.Router();
const users_controllers = require("../controllers/users_controllers")

//Registrar Usuario de tipo cliente

router.post("/create_client", users_controllers.register_user_client);

//Registrar Usuario de tipo propietario

router.post("/create_owner", users_controllers.register_user_owner);

//Login

router.post("/login", users_controllers.login_user);


module.exports = router;