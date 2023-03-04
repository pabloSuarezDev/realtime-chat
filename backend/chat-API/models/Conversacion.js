module.exports = (sequelize, DataTypes) => {
  const Conversacion = sequelize.define('conversaciones', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_primerUsuario: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    id_segundoUsuario: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    emisor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    receptor: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nuevo_mensaje: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Conversacion;
};