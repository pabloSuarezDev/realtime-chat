const { sequelize } = require('../models/models');
const db = require('../models/models');
const Mensaje = db.mensaje;
const fechaFormateada = require('../services/fechaFormateada');
const todos = async(req, res) => {
  let params = req.params;

  if(Object.keys(params).length <= 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Faltan parametros'
    });
  }

  let mensajes = await sequelize.query(`
    SELECT * FROM mensajes 
    INNER JOIN conversaciones 
    ON mensajes.id_conversacion = ${params.id} AND conversaciones.id = ${params.id}
  `);

  if(mensajes.length <= 0) {
    return res.status(404).json({
      status: 'error',
      message: 'No se han encontrado mensajes'
    });
  }

  return res.status(200).json({
    status: 'success',
    message: 'Mensajes listados',
    mensajes: mensajes[0]
  });
};

const crear = async (req, res) => {
  let params = req.body;

  if (Object.keys(params).length <= 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Faltan parametros'
    });
  }

  let mensaje_a_crear = new Mensaje(params);

  if (Object.keys(mensaje_a_crear).length <= 0) {
    return res.status(500).json({
      status: 'error',
      message: 'Error al crear el mensaje'
    });
  }

  let { dataValues } = mensaje_a_crear;

  let nuevoMensaje = await Mensaje.create({
    id: dataValues.id,
    cuerpo: dataValues.cuerpo,
    createdAt: fechaFormateada,
    id_usuario: dataValues.id_usuario,
    id_conversacion: dataValues.id_conversacion,
    updatedAt: fechaFormateada,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Mensaje creado correctamente',
    mensaje: {
      id: nuevoMensaje.dataValues.id,
      cuerpo: nuevoMensaje.dataValues.cuerpo,
      id_usuario: nuevoMensaje.dataValues.id_usuario,
      id_conversacion: parseInt(nuevoMensaje.dataValues.id_conversacion)
    }
  });
};

module.exports = {
  todos,
  crear
}