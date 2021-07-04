const conectar = require('./persistencia');
const carrito = require('./carritoPer');

const obtVentaUsuario = async (email)=>{
    const client = await conectar();

    try{
        if(email){
            const response = await client.query('SELECT * FROM venta WHERE email = $1', [email]);
            return response.rows;
        }else{
            return 1;//El mail es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

const crearVenta = async (email)=>{
    const client = await conectar();

    try{
        if(email){
            const items = carrito.obtCarritoUsuario(email);
            const cantidad = items.length;
            if(cantidad > 0){
                const idVenta = obtIdVenta();
                for(let i = 0; i<=cantidad; i++){
                    const response = await client.query('INSERT INTO venta (idVenta, idProducto, email, fecha, hora, cantidad) values ($1, $2, $3, current_date, current_time, $4)', [idVenta, items[i].idProducto, items[i].email, items[i].cantidad]);
                    console.log(response);
                    return response;
                }

                try{
                    carrito.eliminarTodoCarritoUsuario(email);
                }catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
                    await client.query('ROLLBACK');
                    console.log("Función crearVenta: Error al eliminar los items de la tabla carrito");
                    throw e;
                }
            }else{
                return await actualizarItemCarrito(carrito);
            }
        }else{
            return 1;//El mail es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

const obtIdVenta = async ()=>{
    const client = await conectar();

    try{
        const response = await client.query('select nextval(`sec_venta`)');
        return response.rows;
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

module.exports = {
    obtVentaUsuario,
    crearVenta,
    obtIdVenta
}