//initialize template
var template = "../server/templates/classiJava.html";

//inizialize parser
const mu = require('mu2');
var moustache = require('../services/parseService');

module.exports = {
    load: function(){
        var compiled;
        mu.clearCache();
        mu.compile(template, function(err, cached){
            if(err){
                console.log(err);
            }
        });
    },
    parse: function(template, myMu, cb){
        moustache.parsing(template, myMu, cb);
    },
    getTemplate: function(){
        return template;
    }
}