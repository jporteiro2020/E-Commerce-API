const { Pool } = require('pg');
const { database }  = require('../keys');
const {decrypt} = require('../lib/encriptacion');

const pool = new Pool({
    host: decrypt(database.host),
    user: decrypt(database.user),
    password: decrypt(database.password),
    database: decrypt(database.database),
    port: decrypt(database.port)
});

const conectar = async () => {
    try{
        return await pool.connect();
    }catch (e){
        throw e;
    }
}

module.exports = conectar;