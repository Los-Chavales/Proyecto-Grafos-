let driver = require("./../config/neo4j_connection");
const { v4: uuidv4 } = require('uuid');

class Houses_Models {
  async search_all_houses() { // GET

    let session = driver.session();
    let houses_nodes;

    try {
      houses_nodes = await session.run('MATCH (h:House) RETURN h', {});
      console.log("RESULT");
      //console.log(houses_nodes);
      console.log(houses_nodes.records[0].get(0).properties);
      //return houses_nodes.records[0].get(0).properties;
      return {
        message: "Conexión lograda",
        status: 200,
        data: houses_nodes.records[0].get(0).properties
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

  async create_house(new_house){ //Crear una casa
    new_house.id = uuidv4();
    console.log("En el modelo")
    console.log(new_house)

    //const query = `CREATE (n:Users {id:$id, name:$name, email: $email}) RETURN n`;
    const query = `CREATE(h:house { 
      id:$id,
      price:$price, 
      construction_materials:$construction_materials,
      size:$size,
      rooms:$rooms,
      property_type:$property_type
    }) RETURN h`;
    const params = {
      id: uuidv4(),
      price: new_house.price, 
      construction_materials: new_house.construction_materials,
      size: new_house.size,
      rooms: new_house.rooms,
      property_type: new_house.property_type
    };
    
    //const resultObj = await driver.executeCypherQuery(query, params);

    let session = driver.session();
    let resultObj;

    try {
      resultObj = await session.run(query, params);

      console.log("RESULT");
      //console.log(resultObj);
      console.log(resultObj.records[0].get(0).properties);
      //return resultObj.records[0].get(0).properties;
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