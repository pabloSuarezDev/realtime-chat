const { sequelize } = require('../models/models');
const db = require('../models/models');
const Conversacion = db.conversacion;
const Mensaje = db.mensaje;
const fechaFormateada = require('../services/fechaFormateada');
const { Op } = require('sequelize');

const todas = async(req, res) => {
  let { id } = req.params;

  let conversaciones = await Conversacion.findAll({
    where: {
      [Op.or]: [
        { id_primerUsuario: id },
        { id_segundoUsuario: id }
      ]
    }
  });

  if(Object.keys(conversaciones).length <= 0) {
    return res.status(502).json({
      status: 'error',
      message: 'No se han encontrado conversaciones'
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Conversaciones listadas',
    conversaciones
  });
};

const crear = async(req, res) => {

  let params = req.body;

  if(Object.keys(params).length <= 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Faltan parametros'
    });
  }

  let conversacion = await Conversacion.findOne({ 
    where: {
      id_primerUsuario: params.id_primerUsuario,
      id_segundoUsuario: params.id_segundoUsuario
    }
  });

  if (conversacion !== null) {
    return res.status(500).json({
      status: 'error',
      message: 'La conversación ya existe'
    });
  }

  let conversacion_a_crear = new Conversacion(params);

  if(Object.keys(conversacion_a_crear).length <= 0) {
    return res.status(500).json({
      status: 'error',
      message: 'Error al crear la conversación'
    });
  }

  let { dataValues } = conversacion_a_crear;

  let nuevaConversacion = await Conversacion.create({ 
    id: dataValues.id,
    id_primerUsuario: dataValues.id_primerUsuario,
    id_segundoUsuario: dataValues.id_segundoUsuario,
    emisor: dataValues.emisor,
    receptor: dataValues.receptor,
    nuevo_mensaje: 0,
    createdAt: fechaFormateada,
    updatedAt: fechaFormateada
  });

  return res.status(200).json({
    status: 'success',
    message: 'Conversación creada exitosamente',
    conversacion: nuevaConversacion
  });
};

const borrar = async(req, res) => {
  let { id } = req.params;

  if(typeof id !== "string") {
    return res.status(400).json({
      status: 'error',
      message: 'Faltan parametros'
    });
  }

  let conversacion = await Conversacion.findOne({ where: { id } });

  if(Object.keys(conversacion).length <= 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Error al identificar la conversación'
    });
  }
  
  let mensajesDeConversacion = await Mensaje.findAll({ where: { id_conversacion: id } });

  if(Object.keys(mensajesDeConversacion).length > 0) {
    let mensajesBorrados = await Mensaje.destroy({ where: { id_conversacion: id } });
  } 

  let conversacionBorrada = await conversacion.destroy({ where: { id } });

  return res.status(200).json({
    status: 'success',
    message: 'Conversación borrada exitosamente',
    conversacion: conversacionBorrada
  });
};

const nuevoMensaje = async(req, res) => {
  let { id_conversacion } = req.body;

  let conversacion_actualizada = await sequelize.query(`
    UPDATE conversaciones
    SET nuevo_mensaje = 1
    WHERE id = ${id_conversacion};
  `);

  return res.status(200).json({
    status: 'success',
    message: 'Conversación actualizada exitosamente',
    conversacion: conversacion_actualizada
  });
};

const quitarNuevoMensaje = async(req, res) => {
  let { id_conversacion } = req.body;

  let conversacion_actualizada = await sequelize.query(`
    UPDATE conversaciones
    SET nuevo_mensaje = 0
    WHERE id = ${id_conversacion};
  `);

  console.log(conversacion_actualizada);

  return res.status(200).json({
    status: 'success',
    message: 'Conversación actualizada exitosamente',
    conversacion: conversacion_actualizada
  });
};

module.exports = {
  todas,
  crear,
  borrar,
  nuevoMensaje,
  quitarNuevoMensaje
}