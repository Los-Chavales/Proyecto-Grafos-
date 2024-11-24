const routes_model = require("../models/routes_models");

class Routes_Controllers {

  async winning_house(req, res){
    let result = await routes_model.winning_house()
    return res.status(result.status).json({
      message: result.message,
      data: result.data
    });
  }

  async see_all_relationships(req, res) { //Ver las relaciones
    console.log("Va llegando")
    console.log(req.body)
    let results_houses = []
  

    for (let i = 0; i < req.body.length; i++) {
      
        let result = await routes_model.see_all_relationships(req.body[i])

        results_houses.push({
          id_house:req.body[i].id_house,
          distance: result.data
        })

    }

    results_houses.sort((a, b) => a.distance - b.distance)

    return res.status(200).json({
      message: "conectado",
      data: results_houses
    })
  }

  async create_route(req, res) { // Verificar la relación
    let results = []
    try {
     for (let i = 0; i < req.body.length; i++) {
          console.log(`vuelta ${i}`)
          console.log(req.body[i])
          let result = await routes_model.create_route(req.body[i])
          results.push(result)
      }
      return res.status(200).json({
        message: "fin de la petición",
        data: results
      }); 
    }
    catch (err) {
      console.error(err);
      return {
        message: "Error de la petición",
        status: 500,
        data: err
      };
    }  
  }

  async check_relationship(req, res) { // Verificar la relación
    let result = await routes_model.check_relationship(req.body)
    return res.status(result.status).json({
      message: result.message,
      data: result.data
    });
  }

  async relate_house_and_place(req, res) { // relacionar una casa con un lugar
    let result = await routes_model.relate_house_and_place(req.body)
    return res.status(result.status).json({
      message: result.message,
      data: result.data
    });
  }

}

module.exports = new Routes_Controllers();