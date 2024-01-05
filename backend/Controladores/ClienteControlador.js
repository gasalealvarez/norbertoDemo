// const db = require('../Conexion/Conexion');
const pool = require('../Conexion/Conexion');

exports.crearCliente = async (req, res) => {
    /* try {
        const {nombre, direccion, telefono, localidad, email, id} = req.body;
        sql = "INSERT INTO  cliente(nombre, direccion, telefono, localidad, email) VALUES (?,?,?,?, ?)"
        db.run(sql,[nombre, direccion, telefono, localidad, email,id], (err)=> {
            if (err) return res.json();
        })

        return res.json({
            status:200,
            success:true,
        })
    } catch (error) {
        return res.json({
            status:400,
            success:false,
        })
    } */

    const { nombre, direccion, telefono, localidad, email } = req.body;
    sql = "INSERT INTO  cliente(nombre, direccion, telefono, localidad, email) VALUES ($1,$2,$3,$4, $5) RETURNING *";

    try {
        const result = await pool.query(sql, [
            nombre,
            direccion,
            telefono,
            localidad,
            email
        ]);
        return res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message)
        return res.json({
            status: 400,
            success: false,
        })

    }

}

exports.obtenerClientes = async (req, res) => {
    sql = "SELECT * FROM cliente";
    /*
    try {
        //const queryObject = url.parse(req.url, true).query;
        //if ( queryObject.type) sql += ` WHERE  id= ${queryObject.type} `

        db.all(sql,[], (err, rows)=>{
            if (err) return res.json({status:300, success: false, error:err});
            
            if (rows.length<1) 
                return res.json({status:300, success: false, error: "Row macth"});

                return res.json(rows);
            })
    } catch (error) {
        return res.json({
            status:400,
            success:false,
        })
    } */
    try {
        const result = await pool.query(sql);
        return res.json(result.rows);
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        })
    }

}

exports.obtenerCliente = async (req, res) => {
    // sql = "SELECT * FROM cliente WHERE id = ?";
    const { id } = req.params;

    
    /* db.all(sql, [req.params.id], (err, rows) => {
        if (err) return res.json({ status: 300, success: false, error: err });

        if (rows.length < 1)
            return res.json({ status: 300, success: false, error: "Row macth" });

        return res.json({ status: 200, data: rows, success: true });
    }) */
    try {
        const result = await pool.query(`SELECT * FROM cliente WHERE "idCliente" = $1;`, [id]);
        return res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message)
        return res.json({
            status: 400,
            success: false,
        })
    }

}

exports.actualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, telefono, localidad, email } = req.body;

   
    try {
        const result = await pool.query(`UPDATE cliente SET nombre = $1, direccion = $2,
                 telefono = $3, localidad = $4, email = $5 where "idCliente" = $6 RETURNING *`,
                 [nombre, direccion, telefono, localidad, email, id]);

        return res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message)
        return res.json({
            status: 400,
            success: false,
        }) 
    }
}

exports.obtenerDeuda = async(req, res) => {
    const { id } = req.params;

    try {
        
        const result = await pool.query(`select (sum (total) - sum(cancelada)) as deuda from (select * from venta where "idCliente" = $1);`,
                 [id]);
        return res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message)
        return res.json({
            status: 400,
            success: false,
        }) 
    }
}

