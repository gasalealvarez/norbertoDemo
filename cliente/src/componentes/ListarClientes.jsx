import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import '../estilos/ListarClientes.css';
import { obtenerClientes } from '../Servicio/DatosServicio';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import CrearCliente from './CrearCliente';




export default function ListarClientes() {

    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState();
    const navigate = useNavigate();
  
    useEffect(()=> {
      obtenerClientes()

            .then( res => {
        setClientes(res);
      });
    },[]);

    function handleSubmit(id) {      
    
      
    }

  return (
    <div className='contenedor_tabla'>
      <CrearCliente />
      <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th className='priority-1'>Nombre</th>
          <th className='priority-5'>Direccion</th>
          <th className='priority-4'>Telefono</th>
          <th className='priority-2'>Email</th>
          <th className='priority-1'>#</th> 
        </tr>
      </thead>
      <tbody>
      {clientes.map((cliente) => (
        <tr  key={cliente.idCliente}>
          <td className='priority-1'>{cliente.nombre}</td>
          <td className='priority-5'>{cliente.direccion}</td>
          <td className='priority-4'>{cliente.telefono}</td>
          <td className='priority-2'>{cliente.email}</td>
          <td className='priority-1'><a href={`/facturas/${cliente.idCliente}`}>
                <Button variant="info">Facturas</Button>
              </a>
          </td>       
        </tr>
        ))}
      </tbody>
    </Table>
    </div>
  )
}
