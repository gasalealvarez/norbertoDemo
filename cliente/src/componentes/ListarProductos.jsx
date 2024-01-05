import React, { useEffect, useMemo, useState } from 'react'
import { guardarActualizacion, obtenerProductos } from '../Servicio/DatosServicio';
import DataTable from 'react-data-table-component';
import Loading from '../componentes/Loading'
import '../estilos/ListarProductos.css'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';


export default function ListarProductos() {

  const [producto, setProducto] = useState([]);
  const [records, setRecord] = useState(producto);
  const [isLoading, setisLoading] = useState(false);
  const [selectedRows, setSelectedRows] = useState(false);
  const [porcentaje, setPorcentaje] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setisLoading(true)
    obtenerProductos()

      .then(res => {
        setProducto(res);
        setRecord(res);
        setisLoading(false)
      });


  }, []);



  const columns = [
    {
      name: 'idProducto',
      selector: row => row.ID,
      omit: true
    },
    {
      name: 'Producto',
      selector: row => row.producto,
      sortable: true
    },
    {
      name: 'Presentacion',
      selector: row => row.presentacion
    },
    {
      name: 'Precio',
      selector: row => row.precio
    },
    {
      name: 'Laboratorio',
      selector: row => row.laboratorio,
      sortable: true,
      hide: 'md'
    },
    {
      name: 'Action', 
      cell: row => (
        <div >
          <Button className='btn btn-success' onClick={()=> alert("Editando ID " + row.ID +" En desarrollo")}>Editar</Button>
        </div>
    )}
  ];



  const PaginacionOpciones = {
    rowsPerPageText: "Filas por Pagina",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsText: "Todos"

  }



  function handleFilter(event) {
    const newData = producto.filter(row => {
      return row.laboratorio.toLowerCase().includes(event.target.value.toLowerCase());
    })
    setRecord(newData);
  }


  const tableHeaderstyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "14px",
        backgroundColor: "#b3b3b3"
      }
    }
  }

  if (isLoading) {
    return (
      <Loading />
    )
  }

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
   
  };

  

  function cambiarPrecio() {
    let array = records;
    //let addPorcentaje ="1." + porcentaje;

   
    guardarActualizacion(selectedRows, porcentaje)
    setShow(true);

   /*  selectedRows.map((r) => {
      let objIndex = records.findIndex((obj => obj.ID == r.ID));
      
      //Update object's name property.
      records[objIndex].precio = (parseFloat(r.precio) * parseFloat(addPorcentaje)).toFixed(2); 
    


    })
    setRecord(array) */
    setRecord([])
    
  }
 
  return (
    <div>

      <div className='ActualizarPrecio'>
        <Container className='cabecera'>
          <h3>Actualizacion de Precios</h3>
          <Row>

            <Col md={4}>
              <div>

                <InputGroup className="mb-3">
                  <Form.Control
                    placeholder="Ingrese el procentaje"
                    onChange={()=> setPorcentaje(event.target.value)}
                    aria-describedby="basic-addon2"
                  />
                  <InputGroup.Text id="basic-addon2">%</InputGroup.Text>
                </InputGroup>
              </div>
            </Col>
            <Col md={4} >
              <div>

                <Form.Select aria-label="Default select example">
                  <option value="1">Incrementar</option>
                  <option value="2">Reducir</option>
                </Form.Select>
              </div>
            </Col>
            <Col md={4} >
              <div>
                <Button variant="primary" onClick={cambiarPrecio}>Aplicar</Button>
              </div>
            </Col>
          </Row>

          <Row>
            <label>Total de productos afectados: {selectedRows.length}</label>
          </Row>

       
        </Container>
      </div>

      <Container>
      <Row>
          <Col xs={6}>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>

              <Toast.Body>Datos modificados correctamente !!!</Toast.Body>
            </Toast>
          </Col>

        </Row>
      </Container>
      <DataTable
        customStyles={tableHeaderstyle}
        columns={columns}
        data={records}
        subHeader
        subHeaderComponent={

          <input type="text" className='w-25
            form-control'
            placeholder='Filtrar Laboratorio'
            onChange={handleFilter} />
        }

        fixedHeader
        //fixedHeaderScrollHeight='600px'
        selectableRowsHighlight
        highlightOnHover
        selectableRows
        onSelectedRowsChange={handleChange}
        // clearSelectedRows={toggledClearRows}
        progressPending={isLoading}
        
        pagination
        paginationComponentOptions={PaginacionOpciones}

      />

    </div>
  )
}
