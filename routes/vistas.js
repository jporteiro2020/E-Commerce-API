const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/productos', (req, res) => {
    res.render('tienda');
});

router.get('/sucursal1', (req, res) => {
    res.render('mapa', {
        direccion: 'Juan Paullier 2378 entre Amézaga y Domingo Aramburú',
        mapa: 'mapa1.js'
    });
});

router.get('/sucursal2', (req, res) => {
    res.render('mapa', {
        direccion: 'Demóstenes 3532',
        mapa: 'mapa2.js'
    });
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/registro', (req, res) => {
    res.render('registro');
});

router.get('/recuperar', (req, res) => {
    res.render('recuperar');
});

router.get('/carrito', (req, res) => {
    res.render('carrito');
});

module.exports = router;