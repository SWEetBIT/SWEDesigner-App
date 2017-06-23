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