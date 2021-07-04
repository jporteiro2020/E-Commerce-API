const express = require('express');
const moment = require('moment');
const suscripcionPer = require('../persistencia/suscripcionPer');
const sendErr = require('../utiles/sendErr');

const router = express.Router();

router.post('/suscribir', async (req, res) => {

  const nombre = req.body.nombre;
  const email = req.body.email;
  let buscarEmail = null;
  if(nombre && email) {

    sendErr.validarFormatoEmail(email, res);

    // Fijarme que no exista el mail en la tabla suscripcion
    try{
      buscarEmail = await suscripcionPer.obtSuscripcion(email);

      if (buscarEmail.length > 0) {
        return res.status(400).json({ data: 'El email ya está suscripto' });
      }
    }catch(e){
      sendErr.internalErr(res);
      throw e;
    }

    const suscripcion = {
      nombre,
      email
    };

    try{
      const resultadoPer = await suscripcionPer.crearSuscripcion(suscripcion);

      if(!resultadoPer){
        return sendErr.internalErr(res);
      }
    }catch(e){
      sendErr.internalErr(res);
      throw e;
    }

    return res.status(201).json({ data: 'Suscripción realizada satisfactoriamente' });
  } else {
    return res.status(400).json({ data: 'Faltan datos (requeridos: nombre, email)' });
  }
});

router.delete('/suscribir', async (req, res) => {

  const email = req.body.email;

  if(email) {

    sendErr.validarFormatoEmail(email);

    // Fijarme que no exista el mail en la tabla suscripcion
    try{
      email = suscripcionPer.obtSuscripcion(email);
      if (!email) {
        return res.status(400).json({ data: 'No existe una suscripción para el email ingresado' });
      }
    }catch(e){
      sendErr.internalErr();
      throw e;
    }

    try{
      const resultadoPer = suscripcionPer.eliminarSuscripcion(email);
      if(!resultadoPer){
        return sendErr.internalErr;
      }
    }catch(e){
      sendErr.internalErr;
      throw e;
    }

    return res.status(200).json({ data: 'Se ha eliminado la suscripcion correctamente' });
  } else {
    return res.status(400).json({ data: 'Faltan datos (requeridos: email)' });
  }
});

module.exports = router;