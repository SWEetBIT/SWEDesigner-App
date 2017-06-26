//Init Services, Database & logic var

  //ErrorHandler
  //var error = require('./controller/middleware/errorHandler');

  //moustache
  const mu = require('./controller/middleware/parse');

  //forge
  var encr = require('./controller/middleware/encrypt');

  //db
  var db = require('./model/mongooseConnection');
  var mongooseRequest = require('./model/mongooseRequest');

  //express
  const express = require('express');
  var bodyParser = require('body-parser');
  const app = express();

  //BodyParser init
  app.use(bodyParser.json());

  //Handling degli errori
  //definire app.use(error.nomefunzione()) 
  //vengono chiamate da sè per ogni errore grazie ai next

  //port
  const port = 3000;

  //global var
  var keyCrypt;
  var ivCrypt;
  var encripted;
  var errRead = "error loading request parameters";

//Init Server
const server = require('./serverLoader'); // function loading server

app.listen(port, ()=>{
  console.log("SERVER WORKS!!!" + port);

  server.load(db, mongooseRequest, mu, encr, function(keys){
    keyCrypt = keys[0];
    ivCrypt = keys[1];
  });
});

//Express routing
  //Encrypt/Decrypt
  app.post("/encrypt", function(req,res){
    var myBytes = JSON.stringify(req.body);
    //console.log(myBytes);
    encripted = encr.encrypt(myBytes, keyCrypt, ivCrypt);
    console.log("File cripted correctly");
    res.send(encripted.data);
  })
  app.post("/decrypt", function(req,res){
    //console.log(encripted);
    var decripted = encr.decrypt(encripted, keyCrypt, ivCrypt);
    console.log("File decripted correctly");
    res.send(decripted);
  })
  //Parsing/Generate
  app.post("/parsing", function(req,res) { //modifica per il return e fai un callback
    var myMu = req.body;
    var template = mu.getTemplate();
    mu.parse(template, myMu, function(parsed){
      res.send(parsed);
    });
  })

