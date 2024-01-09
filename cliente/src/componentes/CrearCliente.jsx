import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { guardarCliente } from '../Servicio/DatosServicio';

export default function CrearCliente() {

    const [show, setShow] = useState(false);
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [email, setEmail] = useState("");


    const handleClose = () => setShow(false);
    const handleShow = () =>  {
     
      setShow(true);
    }

    const cerrar = (e) => {
        guardarCliente(nombre, direccion, telefono, localidad, email);
        setNombre("");
        setDireccion("");
        setTelefono("");
        setLocalidad("");
        setEmail("");
        handleClose();
    } 

    return (
        <div className='crearCliente text-center '>
            <Button  className="botonCliente mb-5" variant="danger"  onClick={handleShow} >
                Agregar Cliente
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nuevo Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el nombre completo"
                                value={nombre}
                                onChange={(e) => {
                                    setNombre(e.target.value);
                                }}    
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Dirección:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la dirección"
                                value={direccion}
                                onChange={(e) => {
                                    setDireccion(e.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Telefono:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese el teléfono"
                                value={telefono}
                                onChange={(e) => {
                                    setTelefono(e.target.value);
                                  }}                            
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Localidad:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la localidad"
                                value={localidad}
                                onChange={(e) => {
                                    setLocalidad(e.target.value);
                                }}   
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>E-mail:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingrese la dirección de correo electronico"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                               
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={cerrar} >
                        Aceptar
                    </Button>

                </Modal.Footer>
            </Modal>

        </div>
    )
}
