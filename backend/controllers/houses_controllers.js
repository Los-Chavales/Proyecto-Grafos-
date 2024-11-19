const houses_model = require("../models/houses_models");

function acomodar(places) {
  let lugares = places
  for (const lugar of lugares) {
    if(lugar.property_type) {
      lugar.name = lugar.property_type
    }
    if(Array.isArray(lugar.house_coords)) {
      lugar.lat = lugar.house_coords[0]
      lugar.lng = lugar.house_coords[1]
    }
  }
  return lugares
}

class Houses_Controllers {
  async search_all_houses(req, res) { // GET
    let result = await houses_model.search_all_houses()
    return res.status(result.status).json({
      message: result.message,
      data: acomodar(result.data)
    });
  }

  async search_all_houses_owner(req, res) { // GET
    let result = await houses_model.search_all_houses_owner(req.body)
    return res.status(result.status).json({
      message: result.message,
      data: result.data
    });
  }

  async create_house(req, res){
    let result = await houses_model.create_house(req.body)
    return res.status(result.status).json({
      message: result.message,
      data: result.data
    });
  }

  async delete_home(req, res){
    let result = await houses_model.delete_home(req.params.index)
    return res.status(result.status).json({
      message: result.message,
      data: result.data
    });
  }
}

module.exports = new Houses_Controllers();