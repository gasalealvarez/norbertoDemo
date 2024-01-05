import React, { useState } from 'react'
import ListarClientes from './ListarClientes'
import '../estilos/Clientes.css';

export default function Clientes() {

  const [boton, setBoton]= useState(false);

  return (
    <div>
        <h2 className='titulo'> Lista de Clientes </h2>
        <ListarClientes  />  
    </div>
  )
}
