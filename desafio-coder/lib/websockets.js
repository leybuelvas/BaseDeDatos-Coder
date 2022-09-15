const { Server } = require("socket.io");
const productosController = require('../container/productos.js');
const mensajesController = require('../container/mensajes.js');

// Exporto el websocket
module.exports.setup = function(server) {
    const io = new Server(server);
    io.on('connection', socket => {
        productosController.obtenerProductos().then(productos => {
            socket.emit('actualizarListado', productos);
        }).catch(console.error)
        mensajesController.obtenerMensajes().then(mensajes => {
            console.log(mensajes);
            socket.emit('messages', mensajes);
        }).catch(console.error)

        /* Eventos */
        socket.on('insertarProducto', producto => {
            productosController.agregarProducto(producto).then(() => {
                productosController.obtenerProductos().then(productos => {
                    io.emit('actualizarListado', productos);
                })
            }).catch(console.error);
        });
        socket.on('new-message', function(message) {
            mensajesController.agregarMensaje(message).then(() => {
                mensajesController.obtenerMensajes().then(mensajes => {
                    io.sockets.emit('messages', mensajes);
                })
            });
        });
    });
}