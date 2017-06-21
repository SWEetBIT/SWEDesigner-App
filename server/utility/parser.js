const mu = require('mu2');
const fs = require('fs');
const path = require('path');

module.exports = {
  parse: function(myMu){
    mu.root = "../server/templates/";

    [
      'moustache'
    ].forEach(function(name){
      
      mu.compileAndRender(name  + '.html', myMu).on('data',
      function (data){
        console.log(data.toString());
      });
    });
  }
};
