import axios from 'axios';
import { saveAs } from 'file-saver'

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

export async function obtenerClientes() {
  /* const response = await fetch('http://localhost:3000/api/demo/cliente');
  let  data  = await response.json();
  return data; */
  let res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/demo/cliente`);

  let data = res.data;
  return data;

}

export async function obtenerCliente(id) {

  
  /* const response = await fetch('http://localhost:3000/api/demo/cliente');
  let  data  = await response.json();
  return data; */
  let res = await axios.get(`${URL}/api/demo/cliente/${id}`);

  let data = res.data;
  return data;

}


export async function exportar(datos) {


  // con post agrega productos
  // con put actualiza

  console.log(datos)

  try {
    let res = await axios.post(`${URL}/api/demo/producto`, datos,

      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json'
        }
      })
    let results = await res.json();
    return results;
  } catch (err) {
    // Handle Error Here
    return err;
  }


}

export async function obtenerProductos() {

  let res = await axios.get(`${URL}/api/demo/producto`);

  let data = res.data;
  return data;

}

export async function obtenerVentas(idCliente) {
  let res = await axios.get(`${URL}/api/demo/ventas/${idCliente}`);

  let data = res.data;
  return data;
}

export async function detalleFactura(idVenta) {
  let res = await axios.get(`${URL}/api/demo/venta/${idVenta}`);

  let data = res.data;
  return data;
}


export async function guardarVenta(productos, cliente, total) {
  const venta = {
    idCliente: cliente.value.idCliente,
    total: total,
    productos: productos,
    fecha: new Date().toLocaleDateString('en-GB')
  }


  let id = 0;

  let res = await axios.post(`${URL}/api/demo/ventas`, venta)
    .then((response) => {
      id = response.data.data;

    })
    .catch((err) => { return err });

  return id;
}


export async function guardarPago(ID, cancelada) {
  const pago = {
    ID: ID,
    cancelada: cancelada
  }

  let res = await axios.put(`${URL}/api/demo/venta`, pago)
    .then((response) => { console.log('Respuesta ' + response) })
    .catch((err) => { return err });
}

export async function obtenerDeuda(id) {
 
}

export async function ventasCliente(idCliente) {

  let res = await axios.get(`${URL}/api/demo/ventas/${idCliente}`);

  return res;
}


export async function crearPdf(nombre, email, recibo, total, productos) {
  const data = { nombre, email, recibo, total, productos }
  const mail = { email }


  await axios.post(`${URL}/api/demo/pdf`, data)
    .then((response) => {
      axios.get(`${URL}/api/demo/pdf`, { responseType: 'blob' })
        .then((res) => {
          const pdfBlob = new Blob([res.data], { type: 'application/pdf' })
          saveAs(pdfBlob, 'InvoiceDocument.pdf')  //to save we use file saver

        })
        .then(() => {
          axios.post(`${URL}/api/demo/enviarPdf`, mail)

            .then((response) => {
              console.log(response);
              alert(response.data)
            })

        })
    })

}


export async function crearRecibo(recibo, entrega, cliente) {

  const {nombre, email} = cliente;
  const data = { recibo, entrega, nombre }

  const mail = { email }


   await axios.post(`${URL}/api/demo/recibo`, data)
  .then((response) => {
    axios.get(`${URL}/api/demo/recibo`, { responseType: 'blob' })
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' })
        saveAs(pdfBlob, 'ReciboDocument.pdf')  //to save we use file saver

      })
      .then(() => {
        console.log(email)
        axios.post(`${URL}/api/demo/enviarRecibo`, mail)

          .then((response) => {
            console.log(response);
            alert(response.data)
          })

      })
  }) 
}

export async function guardarActualizacion(ids,  porcentaje) {
  
  //const mail = { email }
  let porcentajefinal;
  
  if (porcentaje.length == 1) {
    porcentajefinal = "0" + porcentaje;
  } else {
    porcentajefinal = porcentaje
  }
  let addPorcentaje ="1." + porcentajefinal;
  let lista=[];
  
 

   ids.map(id => {
    const productoEditar = {
      id: id.ID,
      precioAnterior: id.precio,
      precio: (parseFloat(id.precio) * parseFloat(addPorcentaje)).toFixed(2) 
    }
  
  
      lista.push(productoEditar);
    
  })

  let res = await axios.put(`${URL}/api/demo/listaproductos`, lista)
    .then((response) => { console.log('Respuesta ' + response) })
    .catch((err) => { return err });
  
} 





