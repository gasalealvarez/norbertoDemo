module.exports =(nombre, email, recibo,  total, productos)=> {

   
    const today = new Date();
    
    return `
        <!doctype html>
        <html>
        <head>
        <meta charset="utf-8">
        <title>PDF Result Template</title>
        <style>
        .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        font-size: 16px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica';
        color: #555;
        }
        .margin-top {
        margin-top: 50px;
        }
        .justify-center {
        text-align: center;
        }
        .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
        }
        .invoice-box table td {
        padding: 5px;
        vertical-align: top;
        }
     
       
        .invoice-box table tr td:nth-child(2) {
        text-align: right;
        
        }
     
        .invoice-box table tr.top table td {
        padding-bottom: 20px;
        }
        .invoice-box table tr.top table td.title {
        font-size: 45px;
        line-height: 45px;
        color: #333;
        }
        .invoice-box table tr.information table td {
        padding-bottom: 40px;
        }
        .invoice-box table tr.heading td {
        text-align: left;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
        }
        .invoice-box table tr.details td {
        padding-bottom: 20px;
        }
        .invoice-box table tr.item td:nth-child(2) {
           width: 60%;
           text-align: left;
         
           border-bottom: 1px solid #eee;
        }
     
        .invoice-box table tr.item td {
           
           border-bottom: 1px solid #eee;
        }
        .invoice-box table tr.item.last td {
         
        border-bottom: none;
        }
        .invoice-box table tr.total td:nth-child(2) {
           background:blue;
        border-top: 4px solid #eee;
        font-weight: bold;
        }
      
     </style>
     </head>
      <body>
        <div class="invoice-box">
           <table cellpadding="0" cellspacing="0">
              <tr class="top">
                 <td colspan="4">
                    <table>
                       <tr>
                          
                          Fecha: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                          <br/>
                          Email: ${`${email}`}
                          </td>
                       </tr>
                    </table>
                 </td>
              </tr>
              <tr class="information">
                 <td colspan="4">
                    <table>
                       <tr>
                          <td>
                             Cliente: ${nombre}
                          </td>
                          <td>
                             Recibo numero: ${recibo}
                          </td>
                       </tr>
                    </table>
                 </td>
              </tr>
              <tr class="heading">
                 <td>Cant</td>
                 <td>Producto</td>
                 <td>Precio</td>
                 <td>Subtotal</td>
              </tr>

              ${productos.map(p => `
              <tr class="item">
              <td>${p.cantidad}</td>
              <td>${p.producto}</td>
              <td>${p.precio}$</td>
              <td>${parseInt(p.cantidad) * parseFloat(p.precio)}$</td>
              </tr>
              `).join('')}
           </table>
           <br />
           <h3 class="justify-center">Total :  ${total}$</h3>
           <footer>
           <p class="justify-center">Comprobante creado el  ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}</p>
       </footer>
        </div>
     </body>
     </html>
    `
}