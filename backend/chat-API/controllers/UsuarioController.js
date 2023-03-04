const db = require('../models/models');
const Usuario = db.usuario;
const bcrypt = require('bcrypt');
const fechaFormateada = require('../services/fechaFormateada');
// const jwtService = require('../services/jwt');
// const jwt = require('jwt-simple');

const todos = async (req, res) => {
  
  let todos_usuarios = await Usuario.findAll();

  if (todos_usuarios.length <= 0) {
    return res.status(502).json({
      status: 'error',
      message: 'No se han encontrado usuarios'
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Listado de usuarios',
    usuarios: todos_usuarios
  });
};


const registrar = async(req, res) => {
  let params = req.body;

  if (!params.nombre || !params.password || !params.descripcion /*|| !params.imagen*/) {
    return res.status(400).json({
      status: 'error',
      message: 'Faltan datos por enviar',
    });
  }

  //? Control usuario duplicados
  let usuario = await Usuario.findOne({ where: { nombre: params.nombre.toLowerCase() } });

  if (usuario !== null) {
    return res.status(500).json({
      status: 'error',
      message: 'El usuario ya existe'
    });
  }

  let passwd = await bcrypt.hash(params.password, 10);
  params.password = passwd;

  let usuario_a_registrar = new Usuario(params);

  if(Object.keys(usuario_a_registrar).length <= 0) {
    return res.status(500).json({
      status: 'error',
      message: 'Error al guardar el usuario'
    });
  }

  let { dataValues } = usuario_a_registrar;

  //TODO Configurar la subida de imagen de perfil

  let nuevoUsuario = await Usuario.create({ 
    id: dataValues.id,
    nombre: dataValues.nombre,
    password: dataValues.password,
    createdAt: fechaFormateada,
    updatedAt: fechaFormateada,
    imagen: "default.jpg",
    descripcion: dataValues.descripcion
  });

  return res.status(200).json({
    status: 'success',
    message: 'Usuario registrado correctamente',
    usuario: {
      id: nuevoUsuario.dataValues.id,
      nombre: nuevoUsuario.dataValues.nombre,
      descripcion: nuevoUsuario.dataValues.descripcion,
      imagen: nuevoUsuario.dataValues.imagen
    }
  });
};

const login = async (req, res) => {
  let params = req.body;

  if (!params.nombre || !params.password) {
    return res.status(502).json({
      status: 'error',
      message: 'Faltan datos por enviar',
    });
  }

  let usuario = await Usuario.findOne({ where: { nombre: params.nombre.toLowerCase() } });
  
  if (usuario === null || usuario === undefined) {
    return res.status(502).json({
      status: 'error',
      message: 'No se ha podido identificar al usuario',
    });
  }

  //? Comprobar contraseña
  let passwd = bcrypt.compareSync(params.password, usuario.dataValues.password);

  if (!passwd) {
    return res.status(400).json({
      status: 'error',
      message: 'Fallo al identificar usuario'
    });
  }

  // const token = jwtService.createToken(usuario);

  let { dataValues } = usuario;

  if (Object.keys(dataValues).length <= 0) {
    return res.status(502).json({
      status: 'error',
      message: 'Error al identificar usuario'
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Usuario identificado exitosamente',
    usuario: {
      id: dataValues.id,
      nombre: dataValues.nombre,
      descripcion: dataValues.descripcion,
      imagen: dataValues.imagen,
      // token,
      // decofificado: jwt.decode(token, jwtService.secret)
    }
  });
};

const perfil = async (req, res) => {
  //? Recibir el parametro del id de usuario por la url
  let userId = req.params.id;

  //? Consulta para sacar los datos del usuario
  let { dataValues } = await Usuario.findOne({ where: { id: parseInt(userId) } });

  if (Object.keys(dataValues).length <= 0) {
    return res.status(502).json({
      status: 'error',
      message: 'Error al identificar usuario'
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Datos del usuario',
    usuario: dataValues
  });
};

module.exports = {
  todos,
  registrar,
  login,
  perfil
}