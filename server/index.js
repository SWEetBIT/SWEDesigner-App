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

app.use(bodyParser.text());
app.post("/salvatore", function(req, res){
  var myBytes = req.body;
  var encripted = encr.encrypt(myBytes);
  var key = encr.get_key();
  var iv = encr.get_iv();
  db.ins_crypt_param(key, iv);
  encr.decrypt(encripted);
  res.send("funziona?");
})


  /*app.post('/ins_utente', function(req,res){

    db.ins_user({username: req.body.username, password: req.body.password}, function(err, data) {



    });
  })*/


app.post("/drop", function(req, res){
  db.drop_schema();
  res.send("droppato");
})

app.post("/test", function(req, res){
  var cryptPar = db.load_keyCrypt(function(err,res) {
    //console.log(res);
    var k = res[0].key_code;
    console.log(k);
  });
  
  //var data = JSON.parse(cryptPar);
  //console.log(data);
  /*var k = data[0].key_code;
  var i = data[0].iv_code;
  res.send("key:" + k + "iv:" + i);*/
})

/*app.use(bodyParser.json());
app.post("/salvatore", function(req,res) {
  var myMu = req.body;
  mu.parse(myMu);
  res.send("madonna ladra");
})*/



app.listen(port, ()=>{
  console.log("SERVER WORKS!!!" + port);
});