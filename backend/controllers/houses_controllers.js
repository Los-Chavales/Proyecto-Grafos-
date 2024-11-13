const houses_model = require("../models/houses_model");

class Houses_Controllers {
  async search_all_houses(req, res) { // GET
    let result = await houses_model.search_all_houses()
    return res.status(result.status).json({
      message: result.message,
      data: result.data
    });
  }

  async create_house(req, res){
    //console.log("En el controlador al menos")
    //console.log(req.body)
    let result = await houses_model.create_house(req.body)
    return res.status(result.status).json({
      message: result.message,
      data: result.data
    });
  }
}

module.exports = new Houses_Controllers();