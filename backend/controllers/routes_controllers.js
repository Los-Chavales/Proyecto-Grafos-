const routes_model = require("../models/routes_models");

class Routes_Controllers {
  async relate_house_and_place(req, res) { // relacionar una casa con un lugar
    let result = await routes_model.relate_house_and_place(req.body)
    return res.status(result.status).json({
      message: result.message,
      data: result.data
    });
  }
}

module.exports = new Routes_Controllers();