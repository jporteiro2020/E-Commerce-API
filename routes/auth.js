const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const loginPer = require('../persistencia/loginPer');
const usuarioPer = require('../persistencia/usuarioPer');
const carritoPer = require('../persistencia/carritoPer');
const ventaPer = require('../persistencia/ventaPer');
const sendErr = require('../utiles/sendErr');
const { TOKEN_SECRET, decodeToken, verifyToken } = require('../middlewares/jwt-validate');

const router = express.Router();

router.post('/registro', async (req, res) => {

  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const direccion = req.body.direccion;
  const email = req.body.email;
  const telefono = req.body.telefono;
  const contrasenia = req.body.password;
  const repetirContrasenia = req.body.repetirPassword;

  let usuario = null;

  if(nombre && apellido && direccion && email && telefono && contrasenia) {

    sendErr.validarFormatoEmail(email);

    if(contrasenia != repetirContrasenia){
      return res.status(403).json({ data: 'Las contraseñas ingresadas no son iguales, verifique los datos ingresados' });
    }

    // Fijarme que no exista el usuario
    try{
      usuario = await usuarioPer.verificarMail(email);
      if (usuario.length > 0) {
        return res.status(400).json({ data: 'El usuario ya está registrado' });
      }
    }catch(e){
      sendErr.internalErr(res);
      throw e;
    }

    // Esta OK, vamos a agregarlo
    const salt = await bcrypt.genSalt(16);
    const password = await bcrypt.hash(contrasenia, salt);

    const nuevoUsuario = {
      nombre,
      apellido,
      direccion,
      email,
      telefono,
      password
    };

    try{
      const resultadoPer = await usuarioPer.crearUsuario(nuevoUsuario);
      if(!resultadoPer){
        return sendErr.internalErr(res);
      }
    }catch(e){
      sendErr.internalErr(res);
      throw e;
    }

    return res.status(201).json({ data: 'Usuario creado correctamente' });
  } else {
    return res.status(400).json({ data: 'Faltan datos (requeridos: nombre, apellido, direccion, email, telefono, password)' });
  }
});

router.post('/login', async (req, res) => {
  
  const mail = req.body.mail;
  const pass = req.body.password;

  let usuario = null;

  if(mail && pass){

    sendErr.validarFormatoEmail(mail);
    
    // Validamos si existe el mail en la base de datos
    try{
      const email = await usuarioPer.verificarMail(mail);

      if(!email){
        return sendErr.usuarioOPassIncorrecto(res);
      }
    }catch(e){
      sendErr.internalErr(res);
      throw e;
    }
  }else {
    return res.status(400).json({ data: 'Faltan datos (requeridos: email, password)' });
  }

  try{
    usuario = await usuarioPer.obtUsuario(mail);

    if(!usuario){
      return sendErr.usuarioOPassIncorrecto(res);
    }
  }catch(e){
    sendErr.internalErr(res);
    throw e;
  }
  
  const validPassword = await bcrypt.compare(pass, usuario[0].contrasenia);
  if (!validPassword) {
    return sendErr.usuarioOPassIncorrecto(res);
  }

  const fecha = moment().format('YYYY-MM-DD');
  const hora = moment().format('hh:mm:ss');

  // Crear el token
  const token = jwt.sign({
    mail: mail,
    dia: fecha,
    hora: hora
  }, TOKEN_SECRET);

  try{
    const respuestaPer = await loginPer.insertLoginUsuario({
      email: mail,
      token: token
    });

    if(!respuestaPer){
      return sendErr.internalErr(res);
    }
  }catch(e){
    sendErr.internalErr(res);
    throw e;
  }

  res.status(200).json({ 
    data: 'Login exitoso', 
    token
  });
});

router.put('/actualizarDatosUsuario', verifyToken, async (req, res) => {

  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const direccion = req.body.direccion;
  const email = req.body.email;
  const telefono = req.body.telefono;

  const datosUsuario = decodeToken;
  console.log("datosUsuario:", datosUsuario);

  if(nombre && apellido && direccion && email && telefono) {

    sendErr.validarFormatoEmail(mail);

    // Fijarme que exista el usuario
    try{
      usuario = usuarioPer.verificarMail(datosUsuario.email);
      if (usuario) {
        const datosUsuario = {
          nombre: nombre,
          apellido: apellido,
          direccion: direccion,
          nuevoEmail: email,
          telefono: telefono,
          emailViejo: datosUsuario.email
        };

        const resultadoPer = usuarioPer.actualizarUsuario(datosUsuario);

        if(!resultadoPer){
          return sendErr.internalErr(res);
        }
      }else{
        return res.status(400).json({ data: 'No está autorizado para acceder a esta función' });
      }
    }catch(e){
      sendErr.internalErr(res);
      throw e;
    }

    return res.status(201).json({ data: 'Usuario actualizado correctamente' });
  } else {
    return res.status(400).json({ data: 'Faltan datos (requeridos: nombre, apellido, direccion, email, telefono)' });
  }
});

router.put('/actualizarPassUsuario', verifyToken, async (req, res) => {

  const email = req.body.email;
  const contrasenia = req.body.contrasenia;
  const nuevoPass = req.body.nuevoPass;

  const usuario = null;
  const emailPer = null;

  if(email && contrasenia && nuevoPass) {

    sendErr.validarFormatoEmail(email);

    // Fijarme que exista el usuario
    try{
      emailPer = usuarioPer.verificarMail(email);
      if (emailPer) {
        try{
          usuario = usuarioPer.obtUsuario(email);
          if(!usuario){
            return sendErr.usuarioOPassIncorrecto(res);
          }
        }catch(e){
          sendErr.internalErr(res);
          throw e;
        }
        
        const validPassword = await bcrypt.compare(contrasenia, usuario.contrasenia);
        if (!validPassword) {
          return sendErr.usuarioOPassIncorrecto(res);
        }

        try{
          const resultadoPer = usuarioPer.actualizarPassUsuario(email, nuevoPass);
          if(!resultadoPer){
            return sendErr.internalErr(res);
          }
        }catch(e){
          sendErr.internalErr(res);
          throw e;
        }
      }else{
        return res.status(400).json({ data: 'No está autorizado para acceder a esta función' });
      }
    }catch(e){
      sendErr.internalErr(res);
      throw e;
    }

    return res.status(201).json({ data: 'Usuario actualizado correctamente' });
  } else {
    return res.status(400).json({ data: 'Faltan datos (requeridos: email, contraseña, nuevaContraseña)' });
  }
});

router.delete('/eliminarUsuario', verifyToken, async (req, res) => {

  const email = req.body.email;
  const contrasenia = req.body.contrasenia;

  const usuario = null;
  const emailPer = null;

  if(email && contrasenia) {

    sendErr.validarFormatoEmail(email);

    // Fijarme que exista el usuario
    try{
      emailPer = usuarioPer.verificarMail(email);
      if (emailPer) {
        try{
          usuario = usuarioPer.obtUsuario(email);
          if(!usuario){
            return sendErr.usuarioOPassIncorrecto(res);
          }
        }catch(e){
          sendErr.internalErr(res);
          throw e;
        }
        
        const validPassword = await bcrypt.compare(contrasenia, usuario.contrasenia);
        if (!validPassword) {
          return sendErr.usuarioOPassIncorrecto(res);
        }

        try{
          const resultadoPer = carritoPer.eliminarTodoCarritoUsuario(email);
          if(!resultadoPer){
            return sendErr.internalErr(res);
          }
        }catch(e){
          sendErr.internalErr(res);
          throw e;
        }

        try{
          const resultadoPer = ventaPer.eliminarTodoCarritoUsuario(email);
          if(!resultadoPer){
            return sendErr.internalErr(res);
          }
        }catch(e){
          sendErr.internalErr(res);
          throw e;
        }

        try{
          const resultadoPer = usuarioPer.eliminarUsuario(email);
          if(!resultadoPer){
            return sendErr.internalErr(res);
          }
        }catch(e){
          sendErr.internalErr(res);
          throw e;
        }
      }else{
        return res.status(400).json({ data: 'No está autorizado para acceder a esta función' });
      }
    }catch(e){
      sendErr.internalErr(res);
      throw e;
    }

    return res.status(200).json({ data: 'Usuario eliminado correctamente' });
  } else {
    return res.status(400).json({ data: 'Faltan datos (requeridos: email, contraseña)' });
  }
});

module.exports = router;