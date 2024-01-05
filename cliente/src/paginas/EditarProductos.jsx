import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import Loading from '../componentes/Loading'

import ListarProductos from '../componentes/ListarProductos';

export default function EditarProductos() {

  const [items, setItems] = useState([]);
  const [records, setRecord] = useState(items);
  const [loading, setLoading] = useState(false);
  const [selectedRows, setSelectedRows] = React.useState(false);

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
    console.log("SELECCIONANDO " + selectedRows.map(r => r.Producto))
    console.log("SELECCIONANDO " + selectedRows.length)
  };

  if (loading) {
    return (
      <Loading />
    )
  }



  


  return (
    <div>

     

      {/* <div className='container mt-5 mb-3'>
        <label className='buscador'>Buscar: </label>
        <input type="text" onChange={handleFilter} />
      </div>
      <DataTable
        columns={columns}
        data={records}
        pagination
        paginationComponentOptions={PaginacionOpciones}
        fixedHeader
        fixedHeaderScrollHeight='600px'
        selectableRows
        onSelectedRowsChange={handleChange}
      // clearSelectedRows={toggledClearRows}
      /> */}

      <ListarProductos />
    </div>
  )
}
