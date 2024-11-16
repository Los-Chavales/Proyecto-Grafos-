let driver = require("../config/neo4j_connection");

class Router_Models {

  async relate_house_and_place(new_route){ //Relacionar una casa con un lugar

    const query = `
      MATCH (h:house {id:$id_house}),
      (p:place {id:$id_place})

      CREATE(h)-[r:route {distance:$distance, unit:$unit}]->(p)
      RETURN h,r, p
    `;
    
    const params = {
      id_house: new_route.id_house,
      id_place: new_route.id_place,
      distance: new_route.distance,
      unit: new_route.unit,
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

module.exports = new Router_Models();