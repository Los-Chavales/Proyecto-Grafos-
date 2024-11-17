const places_model = require("../models/places_models");

class Places_Controllers {

  async search_all_places(req, res) { // mostrar todos los lugares
    let result = await places_model.search_all_places()
    return res.status(result.status).json({
      message: result.message,
      data: result.data
    });
  }

  async search_all_places_client(req, res) { // mostrar los lugares registrados de un cliente
    let result = await places_model.search_all_places_client(req.body)
    return res.status(result.status).json({
      message: result.message,
      data: result.data
    });
  }

  async create_place(req, res){
    let result = await places_model.create_place(req.body)
    return res.status(result.status).json({
      message: result.message,
      data: result.data
    });
  }
}

module.exports = new Places_Controllers();