import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import {  crearRecibo, guardarPago, obtenerCliente, ventasCliente } from '../Servicio/DatosServicio';
import { useParams } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import '../estilos/Facturas.css'


export default function Facturas() {
  const [historial, setHistorial]=useState([]);
  const [factura, setFactura]= useState(0);
  const [total, setTotal]= useState(0);
  const [saldo, setSaldo]= useState(0);
  const [cancelado, setCancelado]= useState(0);
  const [abonado, setAbonado] = useState(0);
  const [cliente, setCliente] = useState();
  const [show, setShow] = useState(false);
  const [deuda, setDeuda] = useState();

  const { id } = useParams()

  useEffect(()=> { 
    ventasCliente(id)
          .then( res => {
              setHistorial(res.data);
          });
     obtenerCliente(id)
          .then( res => {
            setCliente(res);
          });

          
    },[saldo]);

  

    function handleFactura(e) {
      const {idVenta, fecha, total, cancelada} = e;
      
      if (cancelada == undefined) {
        setCancelado(0)
        setSaldo(total)
      } else {
        setCancelado(cancelada)
        setSaldo(parseFloat(total) - parseFloat(cancelada));
      }
      setFactura(idVenta);
      setTotal(total);
      
    }

    function handleEntrega() {
        setSaldo(parseFloat(total) -  (parseFloat(abonado)+  parseFloat(cancelado)));
        
        guardarPago(factura, (parseFloat(abonado)+  parseFloat(cancelado)));

        crearRecibo( factura, abonado, cliente)

        setShow(true);

        // (nombre,  fact, fecha, entrega)
        setFactura(0)
        setTotal(0);
        setSaldo(0);
        setCancelado(0);
        setAbonado(0);
    }

  return (
    <div>
      <Container className='cabecera'>
        <Row>
          <Col md={12}>
            <Card className='card'>
              <Card.Header className='header'>Detalle Factura</Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <label>Factura:</label>
                    <Form.Control aria-label="Large"
                      aria-describedby="inputGroup-sizing-sm"
                      value={factura}
                      onChange={() => { }}
                    />
                  </Col>
                  <Col md={6}>
                    <label>Total:</label>
                    <Form.Control aria-label="Large"
                      aria-describedby="inputGroup-sizing-sm"
                      value={total}
                      onChange={() => { }}
                    />
                  </Col>

                </Row>

                <Row>
                  <Col md={6}>
                    <div className="col-auto col-sm-6   form-group d-flex flex-column">
                      <label>Saldo:</label>
                      <Form.Control aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                        value={saldo}
                        onChange={() => {
                        }}
                      />
                    </div>
                    <div className='display-6 mt-3'>
                      <h5 >Deuda</h5>
                    </div>
                  </Col>
                  <Col md={6}>

                    <label>Entrega:</label>

                    <Form.Control aria-label="Large"
                      aria-describedby="inputGroup-sizing-sm"

                      value={abonado}


                      onChange={(event) => {
                        setAbonado(event.target.value)
                      }}
                    />

                    <Button className='boton-aplicar' variant="success" onClick={handleEntrega}>Aplicar</Button>
                  </Col>

                </Row>
              </Card.Body>
            </Card >
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
              <Card.Header className='header'>Ventas </Card.Header>
              <Card.Body>

                <Table striped>
                  <thead>
                    <tr>
                      <th className='priority-1'>Numero</th>
                      <th className='priority-1'>Fecha</th>
                      <th className='priority-4'>Total</th>
                      <th className='priority-4'>Abonado</th>
                      <th className='priority-1'>#</th>
                    </tr>
                  </thead>


                  <tbody>
                    {historial != undefined ? historial.map((e) => (
                      <tr key={e.idVenta}>
                        <td className='priority-1'>{e.idVenta}</td>
                        <td className='priority-1'>{e.fecha}</td>
                        <td className='priority-4'>{e.total}</td>
                        <td className='priority-4'>{e.cancelada}</td>

                        {(e.total != e.cancelada) ?
                          <td> <Button className='botonElminar priority-1' variant="warning" onClick={() => { handleFactura(e) }}>Pagar</Button></td>
                          :
                          <td> <Button className='botonElminar priority-1' variant="success">Cancelado</Button></td>
                        }
                      </tr>

                    )) : <tr><td className="justify-content:center" colSpan={5}>No hay facturas</td></tr>
                    }
                  </tbody>
                </Table>

              </Card.Body>

            </Card>
          </Col>
        </Row>
      </Container>

    </div>
  )
}

