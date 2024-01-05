import { useState, useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import { guardarVenta, obtenerClientes, crearPdf } from '../Servicio/DatosServicio';
import '../estilos/Venta.css'
import logo from "../assets/logo.jpg";
import ModalProducto from './../componentes/SeleccionarProducto';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';

export default function Venta() {
  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState();
  const [productos, setProductos] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);


  useEffect(() => {
    obtenerClientes()
      .then(res => {
        setClientes(res);
      });

  }, []);

  function handleChange(_selectedOption) {
    setCliente(_selectedOption)
  };


  function handleSubtotal() {

  }


  function productoElegido(producto, cantidad) {

    var itemIndex = productos.findIndex(x => x.producto === producto.producto && x.presentacion === producto.presentacion)


    if (itemIndex != -1) {
      var articulos = parseInt(productos[itemIndex].cantidad) + parseInt(cantidad);

      productos[itemIndex] = { ...productos[itemIndex], cantidad: articulos }

      const lista = [...productos];
      setProductos(lista);
      //setTotal(total + precioProductos);   
    }

    if (itemIndex == -1) {
      const productoAgregar = {
        id: producto.ID,
        producto: producto.producto,
        presentacion: producto.presentacion,
        precio: producto.precio.toFixed(2),
        cantidad: cantidad
      }


      const lista = [...productos];

      lista.push(productoAgregar);

      setProductos(lista);

      const precioProductos = cantidad * producto.precio.toFixed(2);

      setTotal(total + precioProductos);
    }
  }


  async function handleTerminar() {

    try {

      if (cliente === undefined || productos.length == 0) {
        throw error
      }
      let id = 0;

      await guardarVenta(productos, cliente, total).then((e) => id = e);

      setShow(true);

      crearPdf(cliente.value.nombre, cliente.value.email, id, total, productos)

      setProductos([]);
      setCliente();
      setTotal(0);

    } catch (error) {
      console.log(error.message)
      alert("Complete todos los datos !!!");
    }

  }


  return (
    <div >
      <Container className='cabecera'>
        <Row>
          <Col md={8}>
            <Card className='card'>
              <Card.Header className='header'>Cliente</Card.Header>
              <Card.Body>
                <Select name="clientes" className='seleccionarCliente'
                  options={clientes.map(e => ({ label: e.nombre, value: e }))}
                  onChange={handleChange}
                />
              </Card.Body>
            </Card >
          </Col>

          <Col md={4}>
            <Card className='card'>
              <Card.Header className='header'>Detalles</Card.Header>
              <Card.Body>
                <InputGroup className='detalle'>
                  <InputGroup.Text id="inputGroup-sizing-lg">Total:</InputGroup.Text>
                  <Form.Control
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm"
                    value={total}
                    onChange={handleSubtotal}
                  />
                </InputGroup>
                <Button className='botonTerminar' variant="secondary" onClick={handleTerminar}>Terminar</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>

              <Toast.Body>Venta ingresada correctamente !!!</Toast.Body>
            </Toast>
          </Col>

        </Row>
      </Container>

      <Container>
        <Row>
          <Col>
            <Card className='card'>
              <Card.Header className='header'>Venta</Card.Header>
              <Card.Body>
                <ModalProducto productoElegido={productoElegido} />
                <Table striped>
                  <thead>
                    <tr>
                      <th className='priority-1'>Cant</th>
                      <th className='priority-1'>Producto</th>
                      <th className='priority-4'>Presentacion</th>
                      <th className='priority-4'>Precio Un.</th>
                      <th className='priority-5'>Subtotal</th>
                      <th className='priority-1'>#</th>
                    </tr>
                  </thead>
                  <tbody>

                    {productos.map((e) => (
                      <tr key={e.id}>
                        <td className='priority-1'>{e.cantidad}</td>
                        <td className='priority-1'>{e.producto}</td>
                        <td className='priority-4'>{e.presentacion}</td>
                        <td className='priority-4'>{e.precio}</td>
                        <td className='priority-5'>{e.cantidad * e.precio}</td>
                        <td> <Button className='botonElminar priority-1 ' variant="warning">Quitar</Button></td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* <p>{cliente.ID} "  "  {cliente.nombre}</p> */}

    </div>
  )
}
