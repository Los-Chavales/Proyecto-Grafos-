let driver = require("../config/neo4j_connection");

// Haversine formula para calcular la distancia
const haversineDistance = (coords1, coords2) => {
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;
  const R = 6371; // Radio de la Tierra en km

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distancia en km
};


class Router_Models {

  async check_relationship(route){ //Verificar la relación

    const query = `
      MATCH
      (h:house {id:$id_house})
      -[r:route]-
      (p:place{id:$id_place}) 
      RETURN r
    `;
    
    const params = {
      id_house: route.id_house,
      id_place: route.id_place,
    };

    let session = driver.session();
    let resultObj;

    try {
      resultObj = await session.run(query, params);

      
      if(resultObj.records.length > 0){
        return {
          message: "Conexión lograda",
          status: 200,
          data: resultObj.records[0].get(0).properties
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

  async relate_house_and_place(new_route){ //Relacionar una casa con un lugar

    let routeFound = await this.check_relationship(new_route) //Verificar que no exista una relación ya registrada

    const distance = haversineDistance(new_route.coords1, new_route.coords2);
    console.log("SAco la distancia")
    console.log(distance)

    if(routeFound.status == 200){
      return {
        message: "Ya existe una ruta hacia allí",
        status: 500,
        data: new_route
      };
    }

    const query = `
      MATCH (h:house {id:$id_house}),
      (p:place {id:$id_place})

      CREATE(h)-[r:route {distance:$distance, unit:$unit}]->(p)
      RETURN h,r, p
    `;
    
    const params = {
      id_house: new_route.id_house,
      id_place: new_route.id_place,
      distance: distance,
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