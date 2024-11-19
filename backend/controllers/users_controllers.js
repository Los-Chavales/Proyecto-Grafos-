const users_model = require("../models/users_models");

class Users_Controllers {
  async decoded_token(req, res) { // crear un cliente
    let result = await users_model.decoded_token(req.body.token)
    return res.status(result.status).json({
      message: result.message,
      data: result.data
    });
  } 

  async register_user_client(req, res) { // crear un cliente
    let result = await users_model.register_user_client(req.body)
    return res.status(result.status).json({
      message: result.message,
      data: result.data
    });
  } 

  async register_user_owner(req, res) { // crear un propietario
    let result = await users_model.register_user_owner(req.body)
    return res.status(result.status).json({
      message: result.message,
      data: result.data
    });
  } 

  async register_user(req, res) { // crear un propietario
    let result = await users_model.register_user(req.body)
    return res.status(result.status).json({
      message: result.message,
      data: result.data
    });
  } 

  async login_user(req, res) { // proceso de login
    let result = await users_model.login_user(req.body)

    res.cookie("token", result.token, {
        sameSite: 'none',
        secure: true,
        httpOnly: false,
    });

    return res.status(result.status).json({
      message: result.message,
      data: result.data,
      token: result.token
    });
  }

}

module.exports = new Users_Controllers();