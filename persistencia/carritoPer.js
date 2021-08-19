const conectar = require('./persistencia');

const obtCarritoUsuario = async (email)=>{
    const client = await conectar();
    
    try{
        if(email){
            const response = await client.query('SELECT * FROM carrito WHERE email = $1', [email]);
            return response.rows;
        }else{
            return 1;//El email es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

const obtItemCarrito = async (idProducto, email)=>{
    const client = await conectar();
    
    try{
        if(idProducto){
            const response = await client.query('SELECT idProducto FROM carrito WHERE idProducto = $1 and email = $2', [idProducto, email]);
            return response.rows;
        }else{
            return 1;//El idProducto es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

const crearItemCarrito = async (carrito)=>{
    const client = await conectar();

    try{
        if(carrito){
            const items = obtItemCarrito(carrito.idProducto, carrito.email);

            if(items.length = 0){
                const response = await client.query('INSERT INTO carrito (idProducto, email, fecha, hora, cantidad) values ($1, $2, current_date, current_time, $3)', [carrito.idProducto, carrito.email, carrito.cantidad]);
                return response;
            }else{
                return await actualizarItemCarrito(carrito);
            }
        }else{
            return 1;//El objeto carrito es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

const actualizarItemCarrito = async (carrito) => {
    const client = await conectar();

    try{
        if(carrito){
            const items = obtItemCarrito(carrito.idProducto, carrito.email);

            if(items.length > 0){
                const response = await client.query('UPDATE carrito set cantidad = cantidad+1 where idProducto = $1 and email = $2', [carrito.idProducto, carrito.email]);
                return response;
            }else{
                return 1;//El objeto items no tiene datos
            }
        }else{
            return 2;//El objeto carrito es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

const eliminarItemCarrito = async (carrito) => {
    const client = await conectar();

    try{
        if(carrito){
            const items = obtItemCarrito(carrito.idProducto, carrito.email);

            if(items.length > 0){
                const response = await client.query('DELETE FROM carrito where idProducto = $1 and email = $2', [carrito.idProducto, carrito.email]);
                return response;
            }else{
                return 1;//El objeto items no tiene datos
            }
        }else{
            return 2;//El objeto carrito es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

const eliminarTodoCarritoUsuario = async (email) => {
    const client = await conectar();

    try{
        if(email){
            const items = obtCarritoUsuario(email);

            if(items.length > 0){
                const response = await client.query('DELETE FROM carrito where email = $1', [email]);
                return response;
            }else{
                return 1;//El objeto items no tiene datos
            }
        }else{
            return 2;//El mail es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

module.exports = {
    obtCarritoUsuario,
    obtItemCarrito,
    crearItemCarrito,
    actualizarItemCarrito,
    eliminarItemCarrito,
    eliminarTodoCarritoUsuario
}