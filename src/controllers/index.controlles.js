
const {Pool}=require('pg')
const pool = new Pool({
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    database:process.env.DB_DATABASE
})

pool.connect()
.then(()=> console.log("Conexion Exitosa!!"));
//-----------------------------------------------------------SENTENCIAS DE TABLA PRODUCTOS-------------------------------------------------///
const getProdcuto = async (req, res) => {
    try
    {
        const response = await pool.query('SELECT * FROM "Usuario"');
        res.status(200).json(response.rows);

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }
    
};

const getProdcutoById = async (req, res) => {

    try
    {
        const id_producto = parseInt(req.params.id);
        const response = await pool.query('SELECT * FROM "Producto" WHERE id_producto = $1', [id_producto]);
        res.json(response.rows);

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }
};

const createProducto = async (req, res) => {

    try
    {
        const { id_producto, codigo_producto,img, nombre_pro, descripcion, marca, genero, talla, costo } = req.body;
        const response = await pool.query('INSERT INTO "Producto" ("id_producto", "codigo_producto","img","nombre_producto","descripcion","marca","genero","talla","costo") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);', [id_producto, codigo_producto ,img, nombre_pro, descripcion, marca, genero, talla, costo]);
        res.json({
             message: 'User Added successfully',
        body: {
            producto: {id_producto, codigo_producto,img, nombre_pro, descripcion, marca, genero, talla, costo}
        }
    });

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   
};

const updateProducto = async (req, res) => {

    try
    {
        const id = parseInt(req.params.id);
        const { id_producto, img, nombre_pro, descripcion, marca, genero, talla, costo } = req.body;

        const response =await pool.query('UPDATE "Producto" SET "id_producto" = $1, "codigo_producto"=$2 ,"img" = $3, "nombre_producto" = $4, "descripcion" = $5, "marca" = $6, "genero" = $7, "talla" = $8, "costo" = $9 WHERE "id_producto" = $1', [
            id_producto, 
            img, 
            nombre_pro, 
            descripcion, 
            marca, 
            genero, 
            talla, 
            costo,
            id
        ]);
        res.json('User Updated Successfully');

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   

};

const deleteProducto = async (req, res) => {

    try
    {
        const id = parseInt(req.params.id);
        await pool.query('DELETE FROM "Producto" where id_producto = $1', [
            id
        ]);
        res.json(`User ${id} deleted Successfully`);

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   

};

//-----------------------------------------------------------SENTENCIAS DE TABLA MARCAS-------------------------------------------------///

const getMarcas = async (req, res) => {

    try
    {
        const response = await pool.query('select *from "Marca"');
        res.status(200).json(response.rows);

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   

};


module.exports = {
    getProdcuto,
    getProdcutoById,
    createProducto,
    updateProducto,
    deleteProducto,
    getMarcas
};