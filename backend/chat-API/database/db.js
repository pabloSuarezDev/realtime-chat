const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chat', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa.'))
  .catch(err => console.error('Error al conectarse a la base de datos:', err));

module.exports = sequelize;