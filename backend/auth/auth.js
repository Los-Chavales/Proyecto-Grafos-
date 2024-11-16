const result = require('dotenv').config()
var jwt = require('jsonwebtoken');

if (!result.parsed.TOKEN_SECRET) { 
    let error_dotenv_JWT = 'No se ha encontrado la variable de entorno: "TOKEN_SECRET". \n';
    throw error_dotenv_JWT //Error al leer variable TOKEN_SECRET en .env
}

function checkLevel(rolToken) {
    if (rolToken == 'propietario') {
      console.log('Es un propietario');
    } else if (rolToken == 'cliente'){
      console.log('Es un cliente');
    }
}

function check(token) {
    token = token.replace('Bearer ', '');
    //console.log('TOKEN',token);
    try {
        var decoded = jwt.verify(token, process.env.TOKEN_SECRET); 
        console.log(decoded);
        if (decoded.rol) checkLevel(decoded.rol);
        return { valLogin: true, Utoken: decoded };
    } catch (err) {
        return { valLogin: err };
    }
}


function checkLoginPropietario(req, res, next) {
    //console.log(req.headers.authorization);
    let reqToken = req.headers.authorization;
    if (reqToken == undefined) return res.status(401).send('Debe ingresar un Token');

    const { valLogin, Utoken } = check(reqToken);
    if (valLogin !== true) return res.status(401).send('Token inválido:  \n' + valLogin);

    if (Utoken.rol !== 'propietario') {
        return res.status(403).send(['Usted no posee permisos de propietario', Utoken]);
    };

    next();
}

function checkLoginCliente(req, res, next) {
    //console.log(req.headers.authorization);
    let reqToken = req.headers.authorization;
    if (reqToken == undefined) return res.status(401).send('Debe ingresar un Token');

    const { valLogin, Utoken } = check(reqToken);
    if (valLogin !== true) return res.status(401).send('Token inválido:  \n' + valLogin);
    
    if (Utoken.rol !== 'cliente') {
        return res.status(403).send(['Usted no posee permisos de cliente', Utoken]);
    };

    next();
}

// INVALIDAR TOKENS POR DATETIME

function checkDatetime(req, res, next){
    let reqToken = req.headers.authorization;
    if (reqToken == undefined) return res.status(401).send('Debe ingresar un Token');
    let token  = check(reqToken)
    console.log("Fue creado en (iat):")
    console.log(token.Utoken.iat)
    console.log("Caduca en (exp):")
    console.log(token.Utoken.exp)
    let fecha_expiracion =  new Date(token.Utoken.exp * 1000)
    let fecha_actual = new Date();
    if(fecha_actual < fecha_expiracion){
        console.log("Token todavia válido")
        next();  
    }else{
        res.status(500).send("Token expirado")
    }
}

function decodificar(token) {
    token = token.replace('Bearer ', '');
    return jwt.verify(token, process.env.TOKEN_SECRET); 
}

module.exports = { checkLoginPropietario, checkLoginCliente, checkDatetime, decodificar };