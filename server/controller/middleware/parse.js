//initialize template
var template = "../server/templates/classiJava.html";

//inizialize parser
const mu = require('mu2');
var moustache = require('../services/parseService');

module.exports = {
    load: function(){
        mu.clearCache();
        mu.compile(template);
    },
    parse: function(template, myMu, cb){
        moustache.parsing(template, myMu, cb);
    }
}