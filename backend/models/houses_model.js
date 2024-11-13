let driver = require("./../config/neo4j_connection");

class Houses_Models {
  async search_all_houses(req, res) { // GET

    let session = driver.session();
    let houses_nodes;

    try {
      houses_nodes = await session.run('MATCH (h:House) RETURN h', {
      });
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
}

module.exports = new Houses_Models();