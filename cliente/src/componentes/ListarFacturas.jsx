import React from 'react'

export default function ListarFacturas({cliente}) {
  return (
    <div>
      <h1>Facturas</h1>
      <h2>Cliente: {cliente.nombre}</h2>
    </div>
  )
}
