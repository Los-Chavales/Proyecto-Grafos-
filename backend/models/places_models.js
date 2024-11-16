let driver = require("../config/neo4j_connection");
const { v4: uuidv4 } = require('uuid');
const { decodificar } = require('../auth/auth')


class Places_Models {

  async create_place(new_place){ //Crear un lugar
    
    const query = `
    MATCH (u:user) 
    WHERE u.name = $name   
      
    CREATE (u)-[d:destiny]->(p:place { 
      id:$id,
      name_place:$name_place
    })  
    RETURN u,d,p`;

    //Decodificar el token para saber quién lo esta registrando

    let decodedToken = decodificar(new_place.token)

    const params = {
      name: decodedToken.name,
      id: uuidv4(),
      name_place: new_place.name_place,
    }

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

module.exports = new Places_Models();