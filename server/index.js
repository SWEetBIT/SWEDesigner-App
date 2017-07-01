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

  /**
   * This callback function instantiate the keyCrypt and ivCrypt with keys array.
   * @callback keysReturned
   * @param {Array} keys An array of <tt>string</tt> that contains crypt values.
   */

  /**
   * This callback function instantiate a rendered template to sent to client.
   * @callback ParseCB
   * @param {Object} parsed A text object that contains the Java source code.
   */

  /**
   * @function server/load
   * @see module:serverLoader
   * @description
   * Loading server's components.
   * @param {string} db Connection to database.
   * @param {string} mongooseRequest Query module.
   * @param {string} mu Parsing module.
   * @param {keysReturned} Callback that set crypt param
   * @return {void}
   */
  server.load(db, mongooseRequest, mu, encr, function(keys){
    keyCrypt = keys[0];
    ivCrypt = keys[1];
  });
});


/**
 * @global
 */
//Express routing
  //Encrypt/Decrypt
  /**
    * @function app/post/encrypt
    * @description
    * This an express routing that call the encrypt service and send to client the encrypted Object
    * @param {string} URI Server Uri that contains the encrypt functions
    * @see module:encrypt
   */
  app.post("/encrypt", function(req,res){
    var myBytes = JSON.stringify(req.body);
    //console.log(myBytes);
    encripted = encr.encrypt(myBytes, keyCrypt, ivCrypt);
    console.log("File cripted correctly");
    res.send(encripted.data);
  })
  /**
    * @function app/post/decrypt
    * @description
    * This an express routing that call the decrypt service and send to client the decrypted Object
    * @param {string} URI Server Uri that contains the decrypt functions
    * @see module:encrypt
   */
  app.post("/decrypt", function(req,res){
    //console.log(encripted);
    var decripted = encr.decrypt(encripted, keyCrypt, ivCrypt);
    console.log("File decripted correctly");
    res.send(decripted);
  })
  //Parsing/Generate
  /**
    *@function app/post/parsing
    * @description
    * This is an express routing function that call the parsing service and send to client the parsed Object
    * @param {string} URI Server Uri that contains the parsing functions
    * @see module:parse
   */
  app.post("/parsing", function(req,res) { 
    var myMu = req.body;
    var template = mu.getTemplate();
    mu.parse(template, myMu, function(parsed){
      res.send(parsed);
    });
  })

