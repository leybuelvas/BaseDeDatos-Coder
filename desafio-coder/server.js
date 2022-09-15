const http = require('http');

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Rutas
const apiRouter = require('./routes/apiRoutes.js');
app.use('/api', apiRouter);

// Websocket
const server = http.createServer(app);
const io = require('./lib/websockets');
io.setup(server);

// Pongo a escuchar el servidor en el puerto indicado
const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

// Migrar las BD
const migracion = require('./database/migracion');
// migracion.crearTablaProductos();
// migracion.crearTablaMensajes();
migracion.popularTablaMensajes();
// migracion.eliminarTablaMensajes();

// en caso de error, avisar
app.on('error', console.warn);

// Middleware para manejo de errores
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Hubo un error');
});

module.exports = server;