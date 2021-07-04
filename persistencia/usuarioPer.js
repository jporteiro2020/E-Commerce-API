const conectar = require('./persistencia');

const verificarMail = async (email)=>{
    const client = await conectar();
    
    try{
        if(email){
            const response = await client.query('SELECT email FROM usuario WHERE email = $1', [email]);
            return response.rows;
        }else{
            return 1; //El mail es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

const obtUsuario = async (email)=>{
    const client = await conectar();
    
    try{
        if(email){
            const response = await client.query('SELECT * FROM usuario WHERE email = $1', [email]);
            return response.rows;
        }else{
            return 1; //El mail es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

const crearUsuario = async (usuario)=>{
    const client = await conectar();

    try{
        if(usuario){
            const response = await client.query('INSERT INTO USUARIO (email, nombre, apellido, direccion, telefono, contrasenia) values ($1, $2, $3, $4, $5, $6)', [usuario.email, usuario.nombre, usuario.apellido, usuario.direccion, usuario.telefono, usuario.password]);
            return response;
        }else{
            return 1;//El objeto usuario es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

const actualizarUsuario = async (usuario) => {
    const client = await conectar();

    try{
        if(usuario){
            const response = await client.query('UPDATE usuario set email = $1, nombre = $2, apellido = $3, direccion = $4, telefono = $5 where email = $6', [usuario.emailNuevo, usuario.nombre, usuario.apellido, usuario.direccion, usuario.telefono, usuario.emailViejo]);
            console.log(response);
            return response;
        }else{
            return 1;//El objeto usuario es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

const actualizarPassUsuario = async (email, pass) => {
    const client = await conectar();

    try{
        if(email, pass){
            const response = await client.query('UPDATE usuario set contrasenia = $1 where email = $2', [pass, email]);
            console.log(response);
            return response;
        }else{
            return 1;//El mail y/o la pass es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

const eliminarUsuario = async (email) => {
    const client = await conectar();

    try{
        if(email){
            const response = await client.query('DELETE FROM usuario where id = $1', [email]);
            console.log(response);
            return response;
        }else{
            return 1; //El mail es null o undefined
        }
    } catch(e){//Si hay un error, realizamos el rollback en la base de datos y lanzamos la excepción
        await client.query('ROLLBACK');
        throw e;
    } finally{//Pase lo que pase, liberamos la conexión de la base de datos
        client.release();
    }
}

module.exports = {
    verificarMail,
    obtUsuario,
    crearUsuario,
    actualizarUsuario,
    actualizarPassUsuario,
    eliminarUsuario
}