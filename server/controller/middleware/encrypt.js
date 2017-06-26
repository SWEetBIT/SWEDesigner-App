var encr = require('../services/encryptService');

module.exports = {
    encrypt : function(myFile, key, iv){
        return encr.encrypt(myFile, key, iv);
    },
    decrypt : function(myFile, key, iv){
        return encr.decrypt(myFile, key, iv);
    },
    getKey : function(){
        encr.get_key();
    },
    getIv : function(){
        encr.get_iv();
    }
}