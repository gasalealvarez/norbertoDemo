CREATE DATABASE products

CREATE TABLE  IF NOT EXISTS  cliente (ID INTEGER PRIMARY KEY, nombre, direccion, telefono, localidad, email);
CREATE TABLE  IF NOT EXISTS  laboratorio (ID INTEGER PRIMARY KEY, nombreLaboratorio);
CREATE TABLE  producto (ID INTEGER PRIMARY KEY, producto VARCHAR(255), presentacion VARCHAR(255), precio VARCHAR(10), Laboratorio VARCHAR(255));
CREATE TABLE  IF NOT EXISTS  venta (ID INTEGER PRIMARY KEY, idCliente, fecha, total,  cancelada);
CREATE TABLE  IF NOT EXISTS  combinaVenta (ID INTEGER PRIMARY KEY, idVenta, idProducto, cantidad, precio);
CREATE TABLE  IF NOT EXISTS  pago (ID INTEGER PRIMARY KEY, idCliente, idVenta, entrega);