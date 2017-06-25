var encr = require('../services/encryptService');

module.exports = {
    encrypt : function(myFile, key, iv){
        encr.encrypt(myFile, key, iv);
    },
    derypt : function(myFIle, key, iv){
        encr.decrypt(myFIle, key, iv);
    },
    getKey : function(){
        encr.get_key();
    },
    getIv : function(){
        encr.get_iv();
    }
}