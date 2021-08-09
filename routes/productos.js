const express = require('express');
const sendErr = require('../utiles/sendErr');
const productosPer = require('../persistencia/productoPer');

const router = express.Router();

router.get('/obtProdDestacado', async (req, res) => {
  let productos = null;
  try{
    productos = await productosPer.obtProdDestacado();
  }catch(e){
    sendErr.internalErr(res);
    throw e;
  }
  res.status(200).json({ 
    data: productos
  });
});

router.get('/obtProductosPC', async (req, res) => {
  let productos = null;
  try{
    productos = await productosPer.obtProdPcEscritorio();
  }catch(e){
    sendErr.internalErr(res);
    throw e;
  }

  res.status(200).json({ 
    data: productos
  });
});

router.get('/obtProductosNot', async (req, res) => {
  let productos = null;
  try{
    productos = await productosPer.obtProdNotebook();
  }catch(e){
    sendErr.internalErr(res);
    throw e;
  }

  res.status(200).json({ 
    data: productos
  });
});

router.get('/obtProductosCons', async (req, res) => {
  let productos = null;
  try{
    productos = await productosPer.obtProdConsola();
    
  }catch(e){
    sendErr.internalErr(res);
    throw e;
  }

  res.status(200).json({ 
    data: productos
  });
});

router.get('/obtProductos', async (req, res) => {
  let productos = null;
  const busqueda = req.query.busqueda;

  try{
    productos = await productosPer.obtProductos(busqueda);
    
  }catch(e){
    sendErr.internalErr(res);
    throw e;
  }

  res.status(200).json({ 
    data: productos
  });
});

/*router.get('/obtProductosConsSubCat', (req, res) => {
  const productos = null;
  try{
    productos = productosPer.obtProdConsola();
  }catch(e){
    sendErr.internalErr();
    throw e;
  }

  res.status(200).json({ 
    data: productos
  });
});*/

module.exports = router;
