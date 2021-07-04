const express = require('express');
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const vistasRouter = require('./routes/vistas');
const authRouter = require('./routes/auth');
const productosRouter = require('./routes/productos');
const suscripcionRouter = require('./routes/suscripcion');

//Se crea una instancia de express (Se crea la aplicación)
const app = express();

const options = {
    key: fs.readFileSync('./certificados/key.pem'),
    cert: fs.readFileSync('./certificados/cert.pem')
};

//Settings
app.set('port', process.env.PORT || 4000);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

// routes
app.use('/', vistasRouter);
app.use('/', authRouter);
app.use('/', productosRouter);
app.use('/', suscripcionRouter);

app.use(function(req, res, next){
    res.status(404);
    res.render('pageNotFound')
});

//Se crea el servidor HTTPS
https.createServer(options, app).listen(app.get('port'), function(){
    console.log("El servidor HTTPS está escuchando en el puerto " + app.get('port') + "...");
});