function internalErr(res){
    res.status(500).json({  
      data: 'Error interno en el servidor'
    });
}

function usuarioOPassIncorrecto(res){
    return res.status(403).json({  
        data: 'El usuario o la contraseña no son correctos'
    });
}

function validarFormatoEmail(email, res){
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // Formato del mail
    if ( regex.test(email) === false) {
      return res.status(400).json({ success: false, message: 'Formato de mail incorrecto' });
    }
}

module.exports = {
    internalErr,
    usuarioOPassIncorrecto,
    validarFormatoEmail
};