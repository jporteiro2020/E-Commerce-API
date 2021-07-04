const conectar = require('./persistencia');

const obtSuscripcion = async (email)=>{
    const client = await conectar();
    
    try{
        if(email){
            const response = await client.query('SELECT * FROM suscripcion WHERE email = $1', [email]);
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

const crearSuscripcion = async (suscrip)=>{
    const client = await conectar();

    try{
        if(suscrip){
            const suscripcion = await obtSuscripcion(suscrip.email);
            
            if(suscripcion.length == 0){
                const response = await client.query('INSERT INTO suscripcion (nombre, email) values ($1, $2)', [suscrip.nombre, suscrip.email]);
                return response;
            }else{
                return 1;//Ya existe un registro en la base de datos
            }
        }else{
            return 2;//El objeto suscrip es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

const eliminarSuscripcion = async (email) => {
    const client = await conectar();
    
    try{
        if(email){
            const suscripcion = await obtSuscripcion(email);

            if(suscripcion.length > 0){
                const response = await client.query('DELETE FROM suscripcion where id = $1', [email]);
                console.log(response);
                return response;
            }else{
                return 1;//No hay suscripciones en la base de datos para el email enviado por parámetro
            }
        }else{
            return 2;//El email es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

module.exports = {
    obtSuscripcion,
    crearSuscripcion,
    eliminarSuscripcion
}