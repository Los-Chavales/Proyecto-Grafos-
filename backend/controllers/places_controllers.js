const places_model = require("../models/places_models");

class Places_Controllers {

  async create_place(req, res){
    let result = await places_model.create_place(req.body)
    return res.status(result.status).json({
      message: result.message,
      data: result.data
    });
  }
}

module.exports = new Places_Controllers();