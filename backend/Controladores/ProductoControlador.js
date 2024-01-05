const pool = require('../Conexion/Conexion');


async function db_all(){
    let sql= "select * from laboratorio";
    return new Promise(function(resolve,reject){
        db.all(sql, function(err,rows){
           if(err){return reject(err);}
           resolve(rows);
         });
    });
}


exports.cargarBD = async (req, res)=>{
    const datos = req.body;


    for (let p in datos) {

        try {
            const { Producto, PRESENTACION, PRECIO, Laboratorio} = datos[p];
            
            console.log(Producto + " -- " + PRESENTACION + " -- " + PRECIO + " -- " + Laboratorio )
            sql = "INSERT INTO producto (producto, presentacion, precio, Laboratorio) VALUES ($1, $2, $3, $4) RETURNING *"

            /* db.run(sql, [Producto, PRESENTACION, PRECIO, Laboratorio], (err) => {
                if (err) return res.json();
            })    */  

                await pool.query(sql, [
                Producto,
                PRESENTACION,
                PRECIO,
                Laboratorio,
            ], (err) => {
                if (err) return res.json();
            }); 
           
        }  catch (error) {
            return res.json({
                status:400,
                success:false,
            })
        }
    }

   return res.json();
        
}

exports.acualizarBD = async (req, res)=>{
    const datos = req.body;


    for (let p in datos) {

        try {
            const {  Producto, PRESENTACION, PRECIO, Laboratorio} = datos[p];
            
            console.log( Producto + " -- " + PRESENTACION + " -- " + PRECIO + " -- " + Laboratorio )
            sql = "UPDATE  producto SET precio = ? WHERE Producto = ? and presentacion = ?"


            db.run(sql, [PRECIO, Producto, PRESENTACION ], (err) => {
                if (err) return res.json();
            })     
        }  catch (error) {
            return res.json({
                status:400,
                success:false,
            })
        }
    }

   return res.json();
        
}


exports.obtenerProductos = async (req, res)=> {
    sql="SELECT * FROM producto";
    try {
       
       /*  db.all(sql,[], (err, rows)=>{
            if (err) return res.json({status:300, success: false, error:err});
            
            if (rows.length<1) 
                return res.json({status:300, success: false, error: "Row macth"});

                return res.json(rows);
            }) */

            const result = await pool.query(sql);
            return res.json(result.rows);
    } catch (error) {
        return res.json({
            status:400,
            success:false,
        })
    }
}

exports.actualizarPrecio = async (req, res) => {
    
    const   datos = req.body;
    
    
   for (let i in datos ) {
   
    const { id, precio} = datos[i];
    console.log("* " + id);
    console.log("* " + precio);
    
   
     try {
        const result = await pool.query(`UPDATE producto SET precio = $1 where "ID" = $2`,
                 [precio, id]);

       
    } catch (error) {
        console.log(error.message)
        return res.json({
            status: 400,
            success: false,
        }) 
    } 
}
}

