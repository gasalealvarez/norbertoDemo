import React, { useEffect, useState } from 'react'
import * as XLSX from 'xlsx';
import Button from 'react-bootstrap/Button';
import { exportar } from '../Servicio/DatosServicio';
import Card from 'react-bootstrap/Card';
import Loading from './Loading';


export default function ExportarProductos() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  if(loading) {
    return (
      <Loading />
    )
  }

  async function exportarDatos() {
    setLoading(true);
    await exportar(items).then((e) => {

      if (e.code === 'ERR_NETWORK') throw error
      setLoading(false);

    }).catch((error) => {
      setLoading(false);
      console.log('ERR_NETWORK')
      //alert('Error al conectar !!')
    }
    )

  }

  

  const readExcel = (file) => {

    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file)

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;


        const wb = XLSX.read(bufferArray, { type: 'buffer' });

        const wsname = wb.SheetNames[0];


        const ws = wb.Sheets[wsname];
        const data = (XLSX.utils.sheet_to_json(ws));
        resolve(data);
      };

      fileReader.onerror = ((error) => {
        reject(error);
      })
    });
    promise.then((d) => {

      setItems(d);

    })
  }


  return (

    <div className='container  mt-5'>
      <h1 className='titulo'>Exportar Excel</h1>

      <div className='contenedorCard'>
        <Card className="text-center">
          <Card.Header>Exportar Archivo a Base de Datos</Card.Header>
          <Card.Body>

            <div className='contenedorInput'>
              <input type='file'
                onChange={(e) => {
                     
                  const file = e.target.files[0];
                  readExcel(file);
                }}
              />
            </div>

            <div className='contenedorBotonExportar'>
              <Button className="botonExportar" variant="primary" onClick={exportarDatos}>Exportar</Button>{' '}
            </div>
          </Card.Body>

        </Card>
      </div>

    </div>

  )
}

