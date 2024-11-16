let driver = require("../config/neo4j_connection");
const { v4: uuidv4 } = require('uuid');
const { decodificar } = require('../auth/auth')

class Houses_Models {
  async search_all_houses() { // GET

    let session = driver.session();
    let houses_nodes;

    try {
      houses_nodes = await session.run('MATCH (h:house) RETURN h', {});
      if(houses_nodes.records.length > 0){
        return {
          message: "Conexión lograda",
          status: 200,
          data: houses_nodes.records[0].get(0).properties
        };
      }else{
        return {
          message: "Conexión lograda",
          status: 404,
          data: "sin resultados"
        };
      }
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

  async create_house(new_house){ //Crear una casa

    //Decodificar el token para ver quién registro la casa

    let decodedToken = decodificar(new_house.token)

    const query = `
    MATCH (u:user) 
    WHERE u.name = $name   
      
    CREATE (u)-[o:owns]->(h:house { 
      id:$id,
      price:$price, 
      construction_materials:$construction_materials,
      size:$size,
      rooms:$rooms,
      property_type:$property_type
    })  
    RETURN u,o,h`;
    
    const params = {
      name: decodedToken.name,
      id: uuidv4(),
      price: new_house.price, 
      construction_materials: new_house.construction_materials,
      size: new_house.size,
      rooms: new_house.rooms,
      property_type: new_house.property_type
    };

    let session = driver.session();
    let resultObj;

    try {
      resultObj = await session.run(query, params);

      console.log("RESULT");
      console.log(resultObj.records[0].get(0).properties);
      return {
        message: "Conexión lograda",
        status: 200,
        data: resultObj.records[0].get(0).properties
      };
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

}

module.exports = new Houses_Models();