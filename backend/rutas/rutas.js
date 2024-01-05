const express = require('express');
const router = express.Router();

const clienteControlador = require('../Controladores/ClienteControlador');
const productoControlador = require('../Controladores/ProductoControlador');
const laboratorioControlador = require('../Controladores/LaboratorioControlador');
const ventaControlador = require('../Controladores/VentaControlador');
const pdfControlador = require('../Controladores/PdfControlador')
const reciboControlador = require('../Controladores/PagoControlador');

router.get('/cliente', clienteControlador.obtenerClientes);
router.get('/cliente/:id', clienteControlador.obtenerCliente);
router.post('/cliente', clienteControlador.crearCliente);
router.put('/cliente/:id', clienteControlador.actualizarCliente);
router.get('/obtenerdeuda/:id', clienteControlador.obtenerDeuda)

router.get('/lab', laboratorioControlador.obtenerLaboratorios);

router.get('/producto', productoControlador.obtenerProductos)
router.post('/producto', productoControlador.cargarBD);
router.put('/producto', productoControlador.acualizarBD);
router.put('/listaproductos', productoControlador.actualizarPrecio);


router.post('/ventas',  ventaControlador.guardarVenta);
router.get('/ventas/:id',  ventaControlador.obtenerVentas);
router.get('/venta/:id',  ventaControlador.detalleVenta);
router.put('/venta', ventaControlador.guardarPago);

router.post('/pdf', pdfControlador.createPdf );
router.get('/pdf', pdfControlador.fetchPdf );
router.post('/enviarPdf', pdfControlador.sendPdf)


router.post('/recibo', reciboControlador.createPdf);
router.get('/recibo', reciboControlador.fetchPdf);
router.post('/enviarRecibo', reciboControlador.sendPdf);


module.exports = router;
