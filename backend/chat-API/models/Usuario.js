module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('usuarios', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false
    },
    imagen: {
      type: DataTypes.STRING,
      defaultValue: 'default.jpg',
      allowNull: false
    }
  }); 

  return Usuario;
};