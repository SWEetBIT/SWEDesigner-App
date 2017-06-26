//Init Services, Database & logic var

  //moustache
  //const mu = require('./controller/middleware/parse');

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

  server.load(db, mongooseRequest, encr, function(keys){
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

/* //moustache
const mu = require('./utility/parser');

//forge
var encr = require('./utility/encrypt');

//db
var db = require('./model/database_logic');

//express
const express = require('express');
var bodyParser = require('body-parser');
const app = express();

//port
const port = 3000;

//BodyParser init
app.use(bodyParser.json());

//global var
var keyCrypt;
var ivCrypt;
var encripted;
var errRead = "error loading request parameters";

//global Fun
function loadCryptParam(){
  db.load_keyCrypt(function(err, res){
    if(err){
      console.log(err);
    }
    else{
      keyCrypt = res[0].key_code;
      ivCrypt = res[0].iv_code;
      console.log("parameters loaded correctly");
    }
  })
}

//DEBUG & TESTING
app.post("/test", function(req, res){
  var key = encr.get_key();
  var iv = encr.get_iv();
  db.ins_crypt_param(key, iv, function(){
    loadCryptParam();
  });
})

//Express routing

  //Init Server
  app.post("/start", function(req, res){
      //generate crypt Param
      db.load_keyCrypt(function (err,res) {
        if(!err && res == ""){ //first time -> create param, insert them in db and retry to load them
          var key = encr.get_key();
          var iv = encr.get_iv();
          db.ins_crypt_param(key, iv, function(){
            console.log("parameters created correctly");
            loadCryptParam();
          });
        }
        else if(!err){ // param already exist -> simply load them
          loadCryptParam();
        }
        else if(err){ // trouble with loading
          console.log(errRead);
        }
    });
  })

  //Db request
  app.post("/drop", function(req, res){
    db.drop_schema();
    res.send("Schema dropped");
  })

  //Utility Func
    //Encrypt/Decrypt
      app.post("/encrypt", function(req,res){
        var myBytes = JSON.stringify(req.body);
        console.log(myBytes);
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
        mu.parsing(myMu, function(parsed){
          res.send(parsed);
        });
      })






  --commenta--app.post('/ins_utente', function(req,res){

    db.ins_user({username: req.body.username, password: req.body.password}, function(err, data) {



    });
  }) --commenta--*/

