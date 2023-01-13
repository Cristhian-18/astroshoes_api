//--------------------------------------------------------CONEXION A POSTGRES--------------------------------------------------------------///
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
        const response = await pool.query('SELECT * FROM "Producto"');
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
        const response = await pool.query('SELECT * FROM "Producto" WHERE "id_producto" = $1', [id_producto]);
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
        const { id_producto, codigo_producto,img, nombre_producto, descripcion, fk_marca, modelo, genero, talla, costo, oferta } = req.body;
        const response = await pool.query('INSERT INTO "Producto" ("id_producto", "codigo_producto","img","nombre_producto","descripcion","fk_marca","modelo","genero","talla","costo","oferta") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);', 
        [id_producto, codigo_producto ,img, nombre_producto, descripcion, fk_marca, modelo,genero, talla, costo, oferta]);
        res.json({
            message: 'Ingreso Exitoso!!',
        body: {
            producto: {id_producto, codigo_producto,img, nombre_producto, descripcion, fk_marca, modelo, genero, talla, costo, oferta}
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
        const { id_producto, codigo_producto,img, nombre_producto, descripcion, fk_marca, modelo, genero, talla, costo, oferta } = req.body;

        const response =await pool.query('UPDATE "Producto" SET "id_producto" = $1, "codigo_producto"=$2 ,"img" = $3, "nombre_producto" = $4, "descripcion" = $5, "fk_marca" = $6, "modelo" = $7,"genero" = $8, "talla" = $9, "costo" = $10,"oferta" = $11, WHERE "id_producto" = $1', [
            id_producto,
            codigo_producto, 
            img, 
            nombre_producto, 
            descripcion, 
            fk_marca, 
            modelo,
            genero, 
            talla, 
            costo,
            oferta,
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

const getMarcasById = async (req, res) => {
    try
    {
        const id_Marca = parseInt(req.params.id);
        const response = await pool.query('select *from "Marca" WHERE "id_Marca" = $1', [id_Marca]);
        res.json(response.rows);

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }
};

const createMarca= async (req, res) => {
    try
    {
        const { id_Marca,nombre,descripcion } = req.body;
        const response = await pool.query('INSERT INTO "Marca" ("id_Marca","nombre","descripcion") VALUES($1, $2, $3);', 
        [id_Marca,nombre,descripcion]);
        res.json({
             message: 'Ingreso Exitoso!!',
        body: {
            producto: {id_Marca,nombre,descripcion}
        }
    });

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   
};
const updateMarca = async (req, res) => {
    try
    {
        const id_Marca = parseInt(req.params.id);
        const {nombre,descripcion } = req.body;

        const response =await pool.query('UPDATE "Marca" SET "nombre"=$1 ,"descripcion" = $2 WHERE "id_Marca" = $3 ;', [        
            nombre,
            descripcion,
            id_Marca
        ]);
        res.json('Marca Updated Exitosa');

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   

};
const deleteMarca = async (req, res) => {

    try
    {
        const id_Marca = parseInt(req.params.id);
        await pool.query('DELETE FROM "Marca" where "id_Marca" = $1', [
            id_Marca
        ]);
        res.json(`User ${id_Marca} deleted Successfully`);

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   

};
//------------------------------------------------------------SENTENCIAS DE TABLA CATEGORIAS-------------------------------------------------///

const getCategoria = async (req, res) => {

    try
    {
        const response = await pool.query('select *from "Categoria"');
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
    getMarcas,
    getMarcasById,
    createMarca,
    updateMarca,
    deleteMarca,
    getCategoria
};