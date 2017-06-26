var forge = require('node-forge');

module.exports = {
    encrypt: function(myFile, key, iv){
        //console.log("key crypt");
        //console.log(key.toString());
        var cipher = forge.cipher.createCipher('AES-CBC', key);
        cipher.start({iv: iv});
        cipher.update(forge.util.createBuffer(myFile));
        cipher.finish();
        var encrypted = cipher.output;
        // outputs encrypted hex
        //console.log(encrypted.toHex());
        return encrypted;
    },
    decrypt: function(myEncr, key, iv){
        //console.log("key decript");
        //console.log(key.toString());
        //console.log("file" + " " + myEncr.toHex());
        var decipher = forge.cipher.createDecipher('AES-CBC', key);
        decipher.start({iv: iv});
        decipher.update(myEncr);
        decipher.finish();
        // outputs decrypted string
        var decrypted = decipher.output;
        //console.log(decrypted);
        var jsonDecr = JSON.stringify(decrypted.toString());
        var str = jsonDecr.split('\\').join('\r');
        //console.log("file decrittato" + " " + jsonDecr);
        return str;
    },
    get_key: function(){
        var key = forge.random.getBytesSync(16);
        return key;
    },
    get_iv: function(){
        var iv = forge.random.getBytesSync(16);
        return iv;
    }
};