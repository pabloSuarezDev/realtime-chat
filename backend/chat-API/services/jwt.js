//? Importar dependencias
const jwt = require('jwt-simple');
const moment = require('moment');

//? Clave secreta para generar el token (para poder codificar y decodificar)
const secret = '*C3gr9iD4$yn&rEZ%UJwUO$A4vN9PQh@i9OGMQ&Hqp&jgLPdkr';

//? Crear funcion para generar tokens
const createToken = (usuario) => {
  const payload = {
    id: usuario.id,
    nombre: usuario.nombre,
    descripcion: usuario.descripcion,
    imagen: usuario.imagen,
    //! iat representa la fecha en la que se creo el payload (informarcion/carga util)
    iat: moment().unix(),
    //! exp fecha de expiracion del token
    exp: moment().add(30, 'days').unix()
  };

  //? Devolver token de jwt
  return jwt.encode(payload, secret);
};

module.exports = {
  secret,
  createToken
}