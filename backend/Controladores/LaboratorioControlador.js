const db = require('../Conexion/Conexion');

exports.actualizarLaboratorios = async (req, res)=> {
    const datos = req.body;


    for (let producto of datos){
        try {
            const {nombreLaboratorio} = req.body;
            console.log(nombreLaboratorio); 
            /* sql = "INSERT INTO  laboratorio(nombreLaboratorio) VALUES (?)"
            db.run(sql,[nombreLaboratorio], (err)=> {
                if (err) return res.json();
            }) */
    
            return res.json({
                status:200,
                success:true,
            })
        } catch (error) {
            return res.json({
                status:400,
                success:false,
            })
        }
    }
}

exports.crearLaboratorio = async (req, res)=>{
    try {
        const {nombreLaboratorio} = req.body;
        console.log(nombreLaboratorio); 
        sql = "INSERT INTO  laboratorio(nombreLaboratorio) VALUES ($1)"

        /* db.run(sql,[nombreLaboratorio], (err)=> {
            if (err) return res.json();
        }); */

        sql = "INSERT INTO  laboratorio(nombreLaboratorio) VALUES ($1) RETURNING *";
        const result = await pool.query(sql, [nombreLaboratorio]);

         return res.json(result.rows[0]);
    } catch (error) {
        return res.json({
            status:400,
            success:false,
        })
    }
}

 exports.obtenerLaboratorios = async (req, res)=>{
    sql="SELECT * FROM laboratorio";
    try {
        //const queryObject = url.parse(req.url, true).query;
        //if ( queryObject.type) sql += ` WHERE  id= ${queryObject.type} `

        db.all(sql,[], (err, rows)=>{
            if (err) return res.json({status:300, success: false, error:err});
            
            if (rows.length<1) 
                return res.json({status:300, success: false, error: "Row macth"});

                return res.json({});
            })
    } catch (error) {
        return res.json({
            status:400,
            success:false,
        })
    } 
 }
    