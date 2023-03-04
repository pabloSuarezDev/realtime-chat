const db = require('../models/models');

module.exports = (sequelize, DataTypes) => {
  const Mensaje = sequelize.define('mensajes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cuerpo: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    id_conversacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'conversaciones',
        key: 'id'
      }
    }
  });

  return Mensaje;
};