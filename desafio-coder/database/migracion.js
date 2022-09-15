const { dbProductos, dbMensajes } = require("../database/knex");

// Productos
function crearTablaProductos() {
  dbProductos.schema
    .createTable("productos", (table) => {
      table.increments("id");
      table.string("title");
      table.decimal("price");
      table.string("thumbnail");
    })
    .then(() => {
      dbProductos("productos")
        .insert([
          {
            title: "Escuadra",
            price: 123.45,
            thumbnail:
              "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
            id: 1,
          },
          {
            title: "Calculadora",
            price: 234.56,
            thumbnail:
              "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
            id: 2,
          },
          {
            title: "Globo Terráqueo",
            price: 345.67,
            thumbnail:
              "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
            id: 3,
          },
        ])
        .then(() => {
          console.log("tabla de productos creada y populada");
        });
    })
    .catch((error) => {
      console.error("error: ", error);
    })
    .finally(() => {
      console.log("cerrando conexion...");
      process.exit(0);
    });
}

// Mensajes
function crearTablaMensajes() {
  dbMensajes.schema
    .createTable("mensajes", (table) => {
      table.increments("id");
      table.string("text");
      table.string("author");
      table
        .timestamp("fyh", { useTz: true })
        .notNullable()
        .defaultTo(dbMensajes.fn.now());
    })
    .then(() => {
        popularTablaMensajes();
        console.log("tabla de mensajes creada");
    })
    .catch((error) => {
      console.log("error:", error);
      throw error;
    })
    .finally(() => {
      console.log("cerrando conexion...");
      process.exit(0);
    });
}

function popularTablaMensajes() {
    dbMensajes("mensajes")
        .insert([
        {
            author: "ley2@gmail.com",
            text: "Hola",
            fyh: "14/09/2022",
        },
        {
            author: "kmunoz@gmail.com",
            text: "Hola, como estas?",
            fyh: "14/09/2022",
        },
        { 
            author: "lesly@gmail.com", 
            text: "Hola!",
            fyh: "14/09/2022" 
        },
        ])
        .then(() => {
            console.log("tabla de mensajes populada");
        });
}

function eliminarTablaMensajes() {
  dbMensajes.schema
    .dropTable("mensajes")
    .then(() => console.log("tabla de mensajes eliminada"))
    .catch(console.error);
}

module.exports = {
  crearTablaProductos,
  crearTablaMensajes,
  popularTablaMensajes,
  eliminarTablaMensajes,
};
