//moustache
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
        var parsed = mu.parse(myMu);
        res.send(parsed);
      })



/*app.post("/salvatore", function(req, res){
  var myBytes = req.body;
  var encripted = encr.encrypt(myBytes); // modifca funziona per param iv e key
  encr.decrypt(encripted);
  res.send("funziona?");
})*/


  /*app.post('/ins_utente', function(req,res){

    db.ins_user({username: req.body.username, password: req.body.password}, function(err, data) {



    });
  })*/

/*app.use(bodyParser.json());
app.post("/salvatore", function(req,res) {
  var myMu = req.body;
  mu.parse(myMu);
  res.send("madonna ladra");
})*/



app.listen(port, ()=>{
  console.log("SERVER WORKS!!!" + port);
});