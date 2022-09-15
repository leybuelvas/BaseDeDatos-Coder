// Base de datos
const { dbMensajes } = require('../database/knex');

async function obtenerMensajes() {
    return dbMensajes('mensajes').select('*');
}

async function agregarMensaje(mensaje) {
    return obtenerMensajes().then(mensajes => {
        mensajes.length === 0 ? (mensaje.id = 1) : (mensaje.id = mensajes.length + 1);
        return dbMensajes('mensajes').insert(mensaje)
    });
}

module.exports = {
    obtenerMensajes,
    agregarMensaje,
};