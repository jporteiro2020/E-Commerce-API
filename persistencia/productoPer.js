const conectar = require('./persistencia');

const obtProdDestacado = async ()=>{
    const client = await conectar();
    
    try{
        const response = await client.query('SELECT p.* FROM producto p, destacado d WHERE p.id = d.idProducto');
        return response.rows;
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

const obtProdPcEscritorio = async ()=>{
    const client = await conectar();
    
    try{
        const response = await client.query('SELECT p.* FROM producto p, pcsEscritorio pc WHERE p.id = pc.idProducto');
        return response.rows;
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

const obtProdNotebook = async ()=>{
    const client = await conectar();
    
    try{
        const response = await client.query('SELECT p.* FROM producto p, notebook n WHERE p.id = n.idProducto');
        return response.rows;
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

const obtProdConsola = async ()=>{
    const client = await conectar();

    try{
        const response = await client.query('SELECT p.*, c.subCategoria FROM producto p, consola c WHERE p.id = c.idProducto');
        return response.rows;
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

const obtProdConsolaSubCategoria = async (subCategoria)=>{
    const client = await conectar();

    try{
        if(subCategoria){
            const response = await client.query('SELECT p.*, c.subCategoria FROM producto p, consola c WHERE p.id = c.idProducto and c.subCategoria = $1', [subCategoria]);
            return response.rows;
        }else{
            return 1;//Si la variable subCategoria es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

const obtProductos = async (busqueda)=>{
    const client = await conectar();

    try{
        if(busqueda){
            const response = await client.query(`SELECT * FROM producto WHERE nombre ILIKE '%${busqueda}%' or descripcionCorta ILIKE '%${busqueda}%' or descripcion ILIKE '%${busqueda}%'`);
            return response.rows;
        }else{
            return 1;//Si la variable busqueda es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

module.exports = {
    obtProdDestacado,
    obtProdPcEscritorio,
    obtProdNotebook,
    obtProdConsola,
    obtProductos
}