import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Autosugest from 'react-autosuggest'
import  '../estilos/ListarProductos.css';

import { obtenerProductos } from '../Servicio/DatosServicio';
import Autosuggest from 'react-autosuggest';



export default function ModalProducto({productoElegido}) {
    const [show, setShow] = useState(false);
    const [data, setData] = useState([]);
    const [productos, setProductos] = useState(data);
    const [productoSeleccionado, setProductoSeleccionado]= useState({});
    const [value, setValue] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const[presidentes, setPresidentes]= useState(data);

   // const[presidenteSeleccionado, setPresidenteSeleccionado]= useState({});

    const handleClose = () => setShow(false);
    const handleShow = () =>  {
      setShow(true);
      setProductos([]);
      setProductoSeleccionado({});
      setValue("");
      setCantidad(1);
    }
  
     const cerrar = (e) => {
        productoElegido(productoSeleccionado, cantidad);
        handleClose();
    } 

    useEffect(()=> {
       
        obtenerProductos()
              .then( res => {
          setData(res);
        });
       
      },[]);
  
      const onSuggestionsFetchRequested=({value})=>{
        setProductos(filtrarProductos(value));
      }
      
      const filtrarProductos=(value)=>{
        const inputValue=value.trim().toLowerCase();
        const inputLength=inputValue.length;
      
        var filtrado=data.filter((producto)=>{
          var textoCompleto= producto.producto + " - " + producto.presentacion ;
      
          if(textoCompleto.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(inputValue)){
            return producto;
          }
        });
      
        return inputLength===0 ? [] : filtrado;
      }
      
      const onSuggestionsClearRequested = () =>{
        setProductos([]);
      }
      
      const getSuggestionValue=(suggestion)=>{
        return `${suggestion.producto} - ${suggestion.presentacion}`;
      }
      
      const renderSuggestion=(suggestion)=>(
        
        <div className='sugerencia' onClick={()=>selecProducto(suggestion)}>
          {`${suggestion.producto} - ${suggestion.presentacion}`}
        </div>
      );
      
      const selecProducto=(producto)=>{
          setProductoSeleccionado(producto);
        
      }
      
      const onChange=(e, {newValue})=>{
        setValue(newValue);
      }
      
      const inputProps={
      placeholder:"Nombre del Producto",
      value,
      onChange
      };
      
      const eventEnter=(e)=>{
      if(e.key == "Enter"){
        var split = e.target.value.split('-');
        var producto ={
          producto: split[0].trim(),
          presentacion: split[1].trim(),
        };
        selecProducto(producto);
      }
      }

     
    return (
        <div className='listarProducto'>
            <Button  className="botonAgregar" variant="danger" onClick={handleShow}>
                Agregar Producto
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Productos</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Autosuggest className="autosugest"
                          suggestions={productos}
                          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                          onSuggestionsClearRequested={onSuggestionsClearRequested}
                          getSuggestionValue={getSuggestionValue}
                          renderSuggestion={renderSuggestion}
                          inputProps={inputProps}
                          onSuggestionSelected={eventEnter}
                        />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Cantidad:</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese la cantidad"
                                
                                value={cantidad}
                                onChange={(e) => {
                                    setCantidad(e.target.value);
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
