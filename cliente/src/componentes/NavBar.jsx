import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import logo from "../assets/logo.jpg";


export default function NavBar() {
  return (
    <div>
      <Navbar expand="lg" >
        <Container>
          <Navbar.Brand href="/home">
            <img src={logo} className='logo' />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse >
            <Nav className="me-auto">
              <NavDropdown title="Clientes" id="basic-nav-dropdown">
                <NavDropdown.Item href="/clientes">Lista de Clientes</NavDropdown.Item>
                <NavDropdown.Item href="">Nuevo Cliente</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Productos" id="basic-nav-dropdown">
                <NavDropdown.Item href="/exportar">Cargar</NavDropdown.Item>
                <NavDropdown.Item href="/productos">Ver</NavDropdown.Item>
                <NavDropdown.Item href="">Nuevo Producto</NavDropdown.Item>
              </NavDropdown>



              <NavDropdown title="Ventas" id="basic-nav-dropdown">
                <NavDropdown.Item href="/venta">Ventas</NavDropdown.Item>
              </NavDropdown>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}
