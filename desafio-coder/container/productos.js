// Base de datos
const { dbProductos } = require('../database/knex');

async function obtenerProductos() {
    return dbProductos('productos').select('*');
}

async function obtenerProducto(id) {
    return obtenerProductos().then(productos => {
        return productos.find((producto) => producto.id == id);
    });
}

async function agregarProducto(producto) {
    obtenerProductos().then(productos => {
        productos.length === 0 ? (producto.id = 1) : (producto.id = productos.length + 1);
        dbProductos('productos').insert(producto).then(() => {
            return Promise.resolve('Producto agregado con éxito');
        });
    });
}

async function actualizarProducto(id, producto) {
    return dbProductos('productos').where({id: id}).update(producto);
}

async function borrarProducto(id) {
    return dbProductos('productos').where({id: id}).del();
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    agregarProducto,
    actualizarProducto,
    borrarProducto,
};