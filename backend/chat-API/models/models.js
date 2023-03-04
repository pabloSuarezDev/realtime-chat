const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      max: dbConfig.pool.min,
      max: dbConfig.pool.acquire,
      max: dbConfig.pool.idle
    }
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch(err => console.log(`Error: ${err}`));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.usuario = require('./Usuario')(sequelize, DataTypes);
db.conversacion = require('./Conversacion')(sequelize, DataTypes);
db.mensaje = require('./Mensaje')(sequelize, DataTypes);


db.sequelize.sync({ force: false })
  .then(() => {
    console.log('Sincronización completada');
  })
  .catch(error => console.log(`Error ${error}`));

module.exports = db;