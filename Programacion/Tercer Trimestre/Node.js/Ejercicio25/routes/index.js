var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});


router.post('/login', function(req, res, next) {
    req.session.mail=req.body.mail;

    var pagina='<!doctype html><html><head></head><body>'+
               '<p>Se creo la variable de sesión</p>'+
               '<p>Puede ingresar al panel de control:</p>'+
               '<a href="/panel">Ingresar</a><br>'+
               '</body></html>';
    res.send(pagina);
});


router.get('/panel', function(req, res, next) {
    if (req.session.mail) {
      var pagina='<!doctype html><html><head></head><body>'+
               '<p>Bienvenido</p>'+
               req.session.mail+
               '<br><a href="/logout">Logout</a></body></html>';
      res.send(pagina);
    } else {
      var pagina='<!doctype html><html><head></head><body>'+
               '<p>No tiene permitido ingresar sin login</p>'+
               '<br><a href="/">Retornar</a></body></html>';
      res.send(pagina);
    }
});


router.get('/logout', function(req, res, next) {
      req.session.destroy();
      var pagina='<!doctype html><html><head></head><body>'+
               '<br><a href="/">Retornar</a></body></html>';
      res.send(pagina);
});


module.exports = router;