const houses_model = require("../models/houses_models");

class Houses_Controllers {
  async search_all_houses(req, res) { // GET
    let result = await houses_model.search_all_houses()
    return res.status(result.status).json({
      message: result.message,
      data: result.data
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