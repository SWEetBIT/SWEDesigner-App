const mu = require('mu2');
const fs = require('fs');
const path = require('path');

module.exports = {
  parsing: function(myMu, cb){
    var template = "../server/templates/classiJava.html";
    const chunks = [];
    mu.clearCache();
    mu.compileAndRender(template, myMu).on('data', function(data){
      chunks.push(data.toString());
    });
    mu.compileAndRender(template, myMu).on('end', function(){
      var parsed = chunks.join('');
      cb(parsed);
    })
  }
};


/*Mustache.parse(template);

// Then, sometime later.
Mustache.render(template, view);*/

/*function(myMu, cb){
    mu.root = "../server/templates/";
    var dataParsed;

    [
      'classiJava'
    ].forEach(function(name){
      
      mu.compileAndRender(name  + '.html', myMu).on('data',
      function (data){
        //console.log(data.toString());
        dataParsed = dataParsed + data.toString();
      });
      console.log(dataParsed);
    });
  }*/