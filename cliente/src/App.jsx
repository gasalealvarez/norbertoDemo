
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import ExportarProductos from './componentes/ExportarProductos';
import NavBar from './componentes/NavBar';
import Clientes from './componentes/Clientes';
import Venta from './paginas/Venta';
import Facturas from './paginas/Facturas';
import EditarProductos from './paginas/EditarProductos';


function App() {
  

  return (
    <>
      <BrowserRouter>
        <NavBar />
          <Routes>
            <Route path="/home"   />
            <Route path="/exportar" element={<ExportarProductos/>}    />
            <Route path="/productos" element={<EditarProductos/>} />
            <Route path="/clientes" element={<Clientes/>}    />
            <Route path="/venta" element={<Venta/>}  />
            <Route path="/facturas/:id" element={<Facturas/>} />
            
          </Routes>


      </BrowserRouter>
    </>
  )
}

export default App
