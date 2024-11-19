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


  async check_relationship_byname(property_type,name_place){ //Verificar la relación por nombre

    const query = `
      MATCH
      (h:house {property_type:$property_type})
      -[r:route]-
      (p:place{name_place:$name_place}) 
      RETURN r
    `;
    
    const params = {
      property_type: property_type,
      name_place: name_place,
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


  async create_route(route){ //Crear relación
    console.log("Allá va")
    console.log(route)

    
   let routeFound = await this.check_relationship_byname(route.house.name, route.place.place) //Verificar que no exista una relación ya registrada
   
    if(routeFound.status == 200){
      return {
        message: "Ya existe una ruta hacia allí",
        status: 500,
        data: route
      };
    } 

    const query = `
      MATCH (h:house {property_type:$property_type}),
      (p:place {name_place:$name_place})

      CREATE(h)-[r:route {distance:$distance, geometry:$geometry}]->(p)
      RETURN r
    `;
    
    const params = {
      property_type: route.house.name,
      name_place: route.place.place,
      distance: route.distance,
      geometry: route.geometry,
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