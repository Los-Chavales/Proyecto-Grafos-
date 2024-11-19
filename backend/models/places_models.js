let driver = require("../config/neo4j_connection");
const { v4: uuidv4 } = require('uuid');
const { decodificar } = require('../auth/auth')


class Places_Models {

  async search_all_places() { // Ver todas las casas

    let session = driver.session();
    let places_nodes;

    try {
      places_nodes = await session.run('MATCH(p:place) RETURN p', {});
      if (places_nodes.records.length > 0) {

        let places = [];

        for (let i = 0; i < places_nodes.records.length; i++) {
          places.push(places_nodes.records[i].get(0).properties)
        }

        return {
          message: "Conexión lograda",
          status: 200,
          data: places
        };
      } else {
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

  async search_all_places_client(client) { // Ver los lugares de un usuario

    let session = driver.session();
    let places_nodes;

    let decodedToken = decodificar(client.token)

    const query = `MATCH(u:user {name:$name})-[d:destiny]-(p:place) RETURN p`;

    const params = {
      name: decodedToken.name,
    }

    try {

      places_nodes = await session.run(query, params);

      if (places_nodes.records.length > 0) {

        let houses = [];

        for (let i = 0; i < places_nodes.records.length; i++) {
          houses.push(places_nodes.records[i].get(0).properties)
        }

        return {
          message: "Conexión lograda",
          status: 200,
          data: houses
        };
      } else {
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

  async create_place(new_place) { //Crear un lugar

    let decodedToken = decodificar(new_place.name)

    const query = `
    MATCH (u:user) 
    WHERE u.name = $name   
      
    CREATE (u)-[d:destiny]->(p:place { 
      id:$id,
      name_place:$name_place,
      place_coords: $place_coords
    })  
    RETURN p`;

    const params = {
  /*     name: new_place.name, */
      name: decodedToken.name,
      id: uuidv4(),
      name_place: new_place.name_place,

      place_coords: new_place.place_coords,
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

  async delete_place(id_place) { //Eliminar un lugar

    console.log("DELETE:")

    console.log(id_place)

    const query = `MATCH(p:place {id:$id_place}) DETACH DELETE p`;

    const params = {
      id_place: id_place,
    }

    let session = driver.session();
    let resultObj;

    try {
      resultObj = await session.run(query, params);

      return {
        message: "Conexión lograda",
        status: 200,
        data: resultObj.records
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