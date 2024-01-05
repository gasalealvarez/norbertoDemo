var uniqid = require('uniqid'); 
const pool = require('../Conexion/Conexion');


async function  altaVenta(idCliente, fecha, total) {

    

   sql = `INSERT INTO venta("idCliente", fecha, total) VALUES ($1, $2, $3) RETURNING *`
   /* db.run(sql,[idCliente, fecha, total], (err )=> {
       if (err) return res.json();

   }) 

   sql = "SELECT max(id) as maximo from venta;"
   return new Promise(function(resolve,reject){
       db.each(sql, function(err,rows){
            if(err){return reject(err);}
            resolve(rows.maximo);
        });
    });
 */

    try {
        
        const result = await pool.query(sql, [
            idCliente,
            fecha,
            total
        ]);
        return(result.rows[0].idVenta)
    } catch (error) {
        console.log(error.message);
    }
}    


exports.guardarVenta = async (req, res)=>{
   
    const datos = req.body;

    
    const  {idCliente,  fecha, total , productos, presentacion, precio, cantidad} = datos;

    
     const idVenta = await altaVenta(idCliente, fecha, total);

    
      
    //console.log(productos)
    for (let p of productos) {

      try {
            const {id,  precio, cantidad} = p;

            console.log(p)
            
            sql = `INSERT INTO "combinaVenta" ("idVenta", "idProducto", cantidad, precio) VALUES ($1,$2,$3,$4)`

            /* db.run(sql, [idVenta, id , cantidad, precio], (err) => {
                if (err) return res.json();
            }); */
    
            
              const result =  pool.query(sql, [
                idVenta,
                id,
                cantidad,
                precio 
            ]); 

           
         }  catch (error) {
            return res.json({
                status:400,
                success:false,
            })
        }  
    }

    console.log('Compra del cliente numero ' + idCliente);
    console.log('fecha ' + fecha);
    console.log('Total de compra ' + total)

    return res.json({status:200, data:idVenta, success:true}); 
}

exports.obtenerVentas = async (req, res)=>{
    
    sql=`SELECT * FROM venta WHERE "idCliente" = ${req.params.id} ORDER BY "idVenta" DESC limit 6`;


    try {
        const result = await pool.query(sql);
        return res.json(result.rows);
    } catch (error) {
        console.log(error.message);
    }
    
    /*  db.all(sql,[], (err, rows)=>{
        if (err) return res.json({status:300, success: false, error:err});
        
        if (rows.length<1) 
            return res.json({status:300, success: false, error: "Row macth"});

            return res.json({status:200, data:rows, success:true});
        })  */


}



exports.detalleVenta = async(req,res)=> {
    sql = `select cliente.nombre, cliente.email,  venta.fecha, venta.total, 
    venta.cancelada, producto.producto, producto.presentacion, combinaventa.cantidad, 
    combinaventa.precio  from venta  
    join combinaventa on combinaventa.idVenta = venta.ID 
    join cliente on cliente.ID = venta.idCliente
    join producto on combinaventa.idProducto = producto.ID
    where venta.id=20`

    db.all(sql,[], (err, rows)=>{
        if (err) return res.json({status:300, success: false, error:err});
        
        if (rows.length<1) 
            return res.json({status:300, success: false, error: "Row macth"});

            return res.json({status:200, data:rows, success:true});
        }) 
}

exports.guardarPago = async (req, res)=> {

    const {ID, cancelada} = req.body;
  
   /*  db.run(sql, [cancelada, ID], function(err){
        if (err) return console.error(err.message);     
    }); */

    const result = await pool.query(`UPDATE venta SET cancelada = $1 WHERE "idVenta" = $2 RETURNING *`,
    [cancelada, ID]);

    return res.json(result.rows[0]);
}