/* const sqlite = require('sqlite3').verbose();

const db = new sqlite.Database("./products.db", sqlite.OPEN_READWRITE, (err)=> {
    if (err) return console.error(err);

    db.run("CREATE TABLE  IF NOT EXISTS  cliente (ID INTEGER PRIMARY KEY, nombre, direccion, telefono, localidad, email)");
    db.run("CREATE TABLE  IF NOT EXISTS  laboratorio (ID INTEGER PRIMARY KEY, nombreLaboratorio)");
    db.run("CREATE TABLE  IF NOT EXISTS  producto (ID INTEGER PRIMARY KEY, producto, presentacion, precio, Laboratorio)");
    db.run("CREATE TABLE  IF NOT EXISTS  venta (ID INTEGER PRIMARY KEY, idCliente, fecha, total,  cancelada)");
    db.run("CREATE TABLE  IF NOT EXISTS  combinaVenta (ID INTEGER PRIMARY KEY, idVenta, idProducto, cantidad, precio)");
    db.run("CREATE TABLE  IF NOT EXISTS  pago (ID INTEGER PRIMARY KEY, idCliente, idVenta, entrega)");
 
});
 */

const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'root',
    database: 'products'
})

module.exports = pool;
//module.exports = db;
