var forge = require('node-forge');

var key = forge.random.getBytesSync(16);
var iv = forge.random.getBytesSync(16);

module.exports = {
    encrypt: function(myFile){
        console.log("key crypt");
        console.log(key.toString());
        var cipher = forge.cipher.createCipher('AES-CBC', key);
        cipher.start({iv: iv});
        cipher.update(forge.util.createBuffer(myFile));
        cipher.finish();
        var encrypted = cipher.output;
        // outputs encrypted hex
        console.log(encrypted.toHex());
        return encrypted;
    },
    decrypt: function(myEncr){
        console.log("key decript");
        console.log(key.toString());
        console.log("file" + " " + myEncr.toHex());
        var decipher = forge.cipher.createDecipher('AES-CBC', key);
        decipher.start({iv: iv});
        decipher.update(myEncr);
        decipher.finish();
        // outputs decrypted string
        var decrypted = decipher.output;
        var jsonDecr = JSON.stringify(decrypted.toString())
        console.log("file decrittato" + " " + jsonDecr);
    },
    get_key: function(){
        return key;
    },
    get_iv: function(){
        return iv;
    }
};