let driver = require("../config/neo4j_connection");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcryptjs");
require("dotenv").config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const jwt = require("jsonwebtoken");


class Users_Models {
  async search_user(user) { // Buscar un usuario

    if (!user.name || !user.password) return { message: "Datos incompletos", status: 400, data: "" };

    //Buscar al usuario por el nombre

    const query = `MATCH(u:user {name:$name}) RETURN u`;
    const params = {
      name: user.name, 
    };
    
    let session = driver.session();
    let resultObj;

    try {
      resultObj = await session.run(query, params);

      //console.log("RESULT de la busqueda");
      //console.log(resultObj.records);

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

  async register_user_client(new_user) { // Crear un cliente

    let userFound = await this.search_user(new_user) //Verificar que no exista un usuario con el mismo nombre

    if(userFound.status == 200){
      return {
        message: "Ya existe un usuario con ese nombre",
        status: 500,
        data: new_user
      };
    }

    new_user.password = await bcrypt.hash(new_user.password, 10);
  
    const query = `CREATE(u:user { 
      id:$id,
      name:$name,
      password:$password,
      user_rol:$user_rol,
      phone:$phone
    }) RETURN u`;

    const params = {
      id: uuidv4(),
      name:new_user.name,
      password:new_user.password,
      user_rol:"cliente",
      phone:new_user.phone
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

  async register_user_owner(new_user) { // Crear un propietario

    let userFound = await this.search_user(new_user) //Verificar que no exista un usuario con el mismo nombre

    if(userFound.status == 200){
      return {
        message: "Ya existe un usuario con ese nombre",
        status: 500,
        data: new_user
      };
    }

    new_user.password = await bcrypt.hash(new_user.password, 10);

    const query = `CREATE(u:user { 
      id:$id,
      name:$name,
      password:$password,
      user_rol:$user_rol,
      phone:$phone
    }) RETURN u`;

    const params = {
      id: uuidv4(),
      name:new_user.name,
      password:new_user.password,
      user_rol:"propietario",
      phone:new_user.phone
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
      console.log(err);
      return {
        message: "Error de la petición",
        status: 500,
        data: err
      };
    }

  } 

  async register_user(new_user) { // Crear un propietario

    let userFound = await this.search_user(new_user) //Verificar que no exista un usuario con el mismo nombre

    if(userFound.status == 200){
      return {
        message: "Ya existe un usuario con ese nombre",
        status: 500,
        data: new_user
      };
    }

    new_user.password = await bcrypt.hash(new_user.password, 10);

    const query = `CREATE(u:user { 
      id:$id,
      name:$name,
      password:$password,
      user_rol:$user_rol,
      phone:$phone
    }) RETURN u`;

    const params = {
      id: uuidv4(),
      name:new_user.name,
      password:new_user.password,
      user_rol:new_user.rol,
      phone:new_user.phone
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
      console.log(err);
      return {
        message: "Error de la petición",
        status: 500,
        data: err
      };
    }

  } 

  async login_user(user) { // Crear un propietario

    try {

      if (!user.name || !user.password) return { message: "Datos incompletos", status: 400, data: "" };

      //Buscar al usuario por el nombre
      let userFound = await this.search_user(user)

      if(userFound.status == 404){
        return {
          message: "no existe un usuario con ese nombre",
          status: 404,
          data: user,
          token: ""
        };
      }

      //Validar contraseña
      const isMatch = await bcrypt.compare(user.password, userFound.data.password);
      if (!isMatch) {
        return {
          message: "Contraseña incorrecta",
          status: 500,
          data: user,
          token: ""
        }
      }

      //Generar un token
      const token = jwt.sign(
        {
        id: userFound.data.id,
        name: userFound.data.name,
        rol: userFound.data.user_rol,
        phone: userFound.data.phone
        }, 
        TOKEN_SECRET, 
        { expiresIn: '1h' }
      );

      return {
        message: "Contraseña correcta",
        status: 200,
        data: user.name,
        token: token
      }

    } catch (err) {
      console.log(err);
      return {
        message: "Error de la petición",
        status: 500,
        data: err,
        token: ""
      };
    }

  } 

}

module.exports = new Users_Models();