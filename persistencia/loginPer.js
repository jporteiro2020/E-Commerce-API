const conectar = require('./persistencia');

const insertLoginUsuario = async (login)=>{
    const client = await conectar();
    
    try{
        if(login){
            const response = await client.query('INSERT INTO LOGIN (email, token, fecha, hora, sesionActiva) values ($1, $2, current_date, current_time, $3)', [login.email, login.token, 'S']);
            return response.rows;
        }else{
            return 1;//El objeto login es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

const obtTokenUsuario = async (email)=>{
    const client = await conectar();
    
    try{
        if(email){
            const response = await client.query('SELECT token FROM LOGIN WHERE email = $1 and sesionActiva = `S`', [login.email]);
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

const logOutUsuario = async (logOut)=>{
    const client = await conectar();

    try{
        if(logOut){
            const token = obtTokenUsuario(logOut.email);

            if(token){
                if(token == logOut.token){
                    const response = await client.query('UPDATE LOGIN SET sesionActiva = `N` where email = $1 and token = $2', [login.email, login.token]);
                    return response.rows;
                }else{
                    return 1;//El token guardado en la base de datos no es igual al enviado en la request
                }
            }else{
                return 2;//No hay sesiones abiertas
            }
        }else{
            return 1;//El objeto logOut es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

module.exports = {
    insertLoginUsuario,
    obtTokenUsuario,
    logOutUsuario
}