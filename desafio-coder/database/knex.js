const options = require('../config/database');
const dbProductos = require('knex')(options.mysql);
const dbMensajes = require('knex')(options.sqlite3);

module.exports = {
    dbProductos: dbProductos,
    dbMensajes: dbMensajes
};