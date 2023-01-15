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
//-------------------------SELECCIONAR PROUCTO----------------------------//
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
//------------------------SELECCIONAR POR ID DE PROUCTO----------------------------//
const getProdcutoById = async (req, res) => {

    try
    {
        const pk_id_producto = parseInt(req.params.id);
        const response = await pool.query('SELECT * FROM "Producto" WHERE "pk_id_producto" = $1', [pk_id_producto]);
        res.json(response.rows);

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }
};
//----------------------------CREAR PROUCTO----------------------------//
const createProducto = async (req, res) => {

    try
    {
        const {pk_id_producto,codigo_producto,img,nombre_producto,descripcion,fk_marca,modelo,genero,talla,costo,oferta,fk_nombre_categoria  } = req.body;
        const response = await pool.query('insert into "Producto"(pk_id_producto,codigo_producto,img,nombre_producto,descripcion,fk_marca,modelo, genero, talla, costo,oferta, fk_nombre_categoria)values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);', 
        [pk_id_producto,codigo_producto,img,nombre_producto,descripcion,fk_marca,modelo,genero,talla,costo,oferta,fk_nombre_categoria]);
        res.json({
            message: 'Ingreso Exitoso!!',
        body: {
            producto: {pk_id_producto,codigo_producto,img,nombre_producto,descripcion,fk_marca,modelo,genero,talla,costo,oferta,fk_nombre_categoria}
        }
    });

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   
};
//----------------------------MODIFICAR PROUCTO----------------------------//
const updateProducto = async (req, res) => {

    try
    {
        const pk_id_producto = parseInt(req.params.id);
        const { codigo_producto,img,nombre_producto,descripcion,fk_marca,modelo,genero,talla,costo,oferta,fk_nombre_categoria } = req.body;

        const response =await pool.query('UPDATE "Producto" SET codigo_producto=$1,img=$2,nombre_producto=$3,descripcion=$4,fk_marca=$5,modelo=$6, genero=$7, talla=$8, costo=$9,oferta=$10,fk_nombre_categoria=$11 WHERE "pk_id_producto" =$12', [
            codigo_producto,
            img,nombre_producto,
            descripcion,
            fk_marca,
            modelo,
            genero,
            talla,
            costo,
            oferta,
            fk_nombre_categoria,
            pk_id_producto
        ]);
        res.json('User Updated Successfully');

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   

};
//-------------------------------DELETE PROUCTO------------------------------//
const deleteProducto = async (req, res) => {

    try
    {
        const pk_id_producto = parseInt(req.params.id);
        await pool.query('DELETE FROM "Producto" where pk_id_producto = $1', [
             pk_id_producto
        ]);
        res.json(`User ${pk_id_producto} deleted Successfully`);

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }
};

//-----------------------------------------------------------SENTENCIAS DE TABLA MARCAS-------------------------------------------------///
//-------------------------SELECCIONAR MARCAS----------------------------//
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
//------------------------SELECCIONAR POR ID DE MARCAS----------------------------//
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
//----------------------------CREAR MARCAS----------------------------//
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
//----------------------------MODIFICAR MARCAS----------------------------//
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
//-------------------------------DELETE MARCAS------------------------------//
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
//-------------------------SELECCIONAR CATEGORIA----------------------------//
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
//------------------------SELECCIONAR POR NOMBRE DE CATEGORIA----------------------------//
const getCategoriaById = async (req, res) => {
    try
    {
        const pk_nombre_cat = req.params.id;
        const response = await pool.query('select *from "Categoria" WHERE "pk_nombre_cat" = $1;', [pk_nombre_cat]);
        res.json(response.rows);

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }
};
//----------------------------CREAR CATEGORIAS----------------------------//
const createCategoria= async (req, res) => {
    try
    {
        const {pk_nombre_cat,id_categoria,descripcion } = req.body;
        const response = await pool.query('INSERT INTO "Categoria" ("pk_nombre_cat","id_categoria","descripcion") VALUES ($1, $2, $3);', 
        [pk_nombre_cat,id_categoria,descripcion]);
        res.json({
             message: 'Ingreso Exitoso!!',
        body: {
            producto: {pk_nombre_cat,id_categoria,descripcion}
        }
    });

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   
};
//----------------------------MODIFICAR CATEGORIAS----------------------------//
const updateCategoria = async (req, res) => {
    try
    {
        const pk_nombre_cat = req.params.id;
        const {id_categoria,descripcion } = req.body;

        const response =await pool.query('UPDATE "Categoria" SET "id_categoria"=$1 ,"descripcion" = $2 WHERE "pk_nombre_cat" = $3', [        
            id_categoria,
            descripcion,
            pk_nombre_cat
        ]);
        res.json('Categoria Updated Exitosa');

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   

};
//-------------------------------DELETE CATEGORIAS------------------------------//
const deleteCategoria = async (req, res) => {

    try
    {
        const pk_nombre_cat = req.params.id;
        await pool.query('DELETE FROM "Categoria" where "pk_nombre_cat" = $1', [
            pk_nombre_cat
        ]);
        res.json(`User ${pk_nombre_cat} deleted Successfully`);

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   

};
//----------------------------------------------------------USUARIO---------------------------------------------------------------///
//-------------------------SELECCIONAR USUARIO----------------------------//
const getUsuario = async (req, res) => {
    try
    {
        const response = await pool.query('select *from "Usuario";');
        res.status(200).json(response.rows);

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   
};
//------------------------SELECCIONAR POR ID DE USUARIO----------------------------//
const getUsuarioById = async (req, res) => {
    try
    {
        const id_usuario = parseInt(req.params.id);
        const response = await pool.query('select *from "Usuario" WHERE "id_usuario" = $1;', [id_usuario]);
        res.json(response.rows);

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }
};
//----------------------------CREAR UASUARIOS----------------------------//
const createUsuario= async (req, res) => {
    try
    {
        const {id_usuario,nombre,apellido,correo,contrasena } = req.body;
        const response = await pool.query('INSERT INTO "Usuario" ("id_usuario","nombre","apellido","correo", "contrasena") VALUES ($1, $2, $3,$4,$5);', 
        [id_usuario,nombre,apellido,correo,contrasena]);
        res.json({
             message: 'Ingreso Exitoso!!',
        body: {
            producto: {id_usuario,nombre,apellido,correo,contrasena}
        }
    });

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   
};
//----------------------------MODIFICAR USUARIOS----------------------------//
const updateUsuario = async (req, res) => {
    try
    {
        const id_usuario = parseInt(req.params.id);
        const {nombre,apellido,correo,contrasena } = req.body;

        const response =await pool.query('UPDATE "Usuario" SET "nombre" = $1,"apellido"=$2, "correo"=$3, "contrasena"=$4 WHERE "id_usuario" = $5;', [        
            nombre,
            apellido,
            correo,
            contrasena,
            id_usuario
        ]);
        res.json('Categoria Updated Exitosa');

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   

};
//-------------------------------DELETE USUARIOS------------------------------//
const deleteUsuario = async (req, res) => {

    try
    {
        const id_usuario = parseInt(req.params.id);
        await pool.query('DELETE FROM "Usuario" where "id_usuario" = $1', [
            id_usuario
        ]);
        res.json(`User ${id_usuario} deleted Successfully`);

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   

};
//----------------------------------------------------------FAVORITOS---------------------------------------------------------------///
//-------------------------------------------------------SELECCIONAR FAVORITOS------------------------------------------------------//
const getFavoritos = async (req, res) => {
    try
    {
        const response = await pool.query('select *from "Favoritos";');
        res.status(200).json(response.rows);

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   
};
//------------------------SELECCIONAR POR ID DE FAVORITOS----------------------------//
const getFavoritosById = async (req, res) => {
    try
    {
        const pk_id_favorito = parseInt(req.params.id);
        const response = await pool.query('select *from "Favoritos" WHERE "pk_id_favorito" = $1;', [pk_id_favorito]);
        res.json(response.rows);

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }
};
//----------------------------CREAR FAVORITOS----------------------------//
const createFavorito= async (req, res) => {
    try
    {
        const {pk_id_favorito,fk_id_usuario,fk_id_producto} = req.body;
        const response = await pool.query('insert into "Favoritos"(pk_id_favorito, fk_id_usuario,fk_id_producto) values ($1,$2,$3);', 
        [pk_id_favorito,fk_id_usuario,fk_id_producto]);
        res.json({
             message: 'Ingreso Exitoso!!',
        body: {
            producto: {pk_id_favorito,fk_id_usuario,fk_id_producto}
        }
    });

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   
};
//----------------------------MODIFICAR FAVORITOS----------------------------//
const updateFavoritos = async (req, res) => {
    try
    {
        const pk_id_favorito = parseInt(req.params.id);
        const {fk_id_usuario,fk_id_producto } = req.body;

        const response =await pool.query('UPDATE "Favoritos" SET fk_id_usuario=$1,fk_id_producto=$2 WHERE "pk_id_favorito" = $3;', [        
            fk_id_usuario,
            fk_id_producto,
            pk_id_favorito
        ]);
        res.json('Categoria Updated Exitosa');

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   

};
//-------------------------------DELETE FAVORITOS------------------------------//
const deleteFavoritos = async (req, res) => {

    try
    {
        const pk_id_favorito = parseInt(req.params.id);
        await pool.query('DELETE FROM "Favoritos" where "pk_id_favorito" = $1', [
            pk_id_favorito
        ]);
        res.json(`User ${pk_id_favorito} deleted Successfully`);

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   
};
//----------------------------------------------------------ADMINISTRACION---------------------------------------------------------------///
//-------------------------SELECCIONAR ADMINISTRACION----------------------------//
const getAdminstracion = async (req, res) => {
    try
    {
        const response = await pool.query('select *from "Administrador";');
        res.status(200).json(response.rows);

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   
};
//------------------------SELECCIONAR POR ID DE ADMINISTRACION----------------------------//
const getAdminstracionById = async (req, res) => {
    try
    {
        const pk_id_administrador = parseInt(req.params.id);
        const response = await pool.query('select *from "Administrador" WHERE "pk_id_administrador" = $1;', [pk_id_administrador]);
        res.json(response.rows);

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }
};
//----------------------------CREAR ADMINISTRADOR----------------------------//
const createAdminstracion= async (req, res) => {
    try
    {
        const {pk_id_administrador,cedula,nombre_admin,apellido_admin,usuario,contrasena,email} = req.body;
        const response = await pool.query('insert into "Administrador"("pk_id_administrador", "cedula", "nombre_admin", "apellido_admin", "usuario", "contrasena", "email") VALUES ($1, $2, $3,$4,$5,$6,$7);', 
        [pk_id_administrador,cedula,nombre_admin,apellido_admin,usuario,contrasena,email]);
        res.json({
             message: 'Ingreso Exitoso!!',
        body: {
            producto: {pk_id_administrador,cedula,nombre_admin,apellido_admin,usuario,contrasena,email}
        }
    });

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   
};
//----------------------------MODIFICAR ADMINISTRACION----------------------------//
const updateAdministracion = async (req, res) => {
    try
    {
        const pk_id_administrador = parseInt(req.params.id);
        const {cedula,nombre_admin,apellido_admin,usuario,contrasena,email} = req.body;

        const response =await pool.query('UPDATE "Administrador" SET "cedula"=$1, "nombre_admin"=$2, "apellido_admin"=$3, "usuario"=$4, "contrasena"=$5, "email"=$6 WHERE "pk_id_administrador" = $7;', [        
            cedula,
            nombre_admin,
            apellido_admin,
            usuario,
            contrasena,
            email,
            pk_id_administrador
        ]);
        res.json('Categoria Updated Exitosa');

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   

};
//-------------------------------DELETE ADMINISTRACION------------------------------//
const deleteAdministracion = async (req, res) => {

    try
    {
        const pk_id_administrador = parseInt(req.params.id);
        await pool.query('DELETE FROM "Administrador" where "pk_id_administrador" = $1', [
            pk_id_administrador
        ]);
        res.json(`User ${pk_id_administrador} deleted Successfully`);

    } catch (error)
    {
        return res.status(500).json({
            message:"Lo sentimos!!! :'v "
        })
    }   
};

//----------------------------------------------------------COMUNICACION-------------------------------------------///
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
    getCategoria,
    getCategoriaById,
    createCategoria,
    updateCategoria,
    deleteCategoria,
    getUsuario,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    getFavoritos,
    getFavoritosById,
    createFavorito,
    updateFavoritos,
    deleteFavoritos,
    getAdminstracion,
    getAdminstracionById,
    createAdminstracion,
    updateAdministracion,
    deleteAdministracion
};