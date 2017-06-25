//middleware istance
var middleware = require('./controller/middleware/midLoader');

//Loading var istance
function loadCryptParam(db){
    db.load_keyCrypt(function(err, res){
        if(err){
            console.log(err);
        }
        else{
            var keyCrypt = res[0].key_code;
            var ivCrypt = res[0].iv_code;
            console.log("parameters loaded correctly");
            return [keyCrypt, ivCrypt];
        }
    })
}


module.exports = {
    load : function(db, mR, encr, cb){

        //Connect to Database
        db.conn();

        //Loading crypt Key
        mR.load_keyCrypt(function (err,res) {
            if(!err && res == ""){ //first time -> create param, insert them in db and retry to load them
              var key = encr.get_key();
              var iv = encr.get_iv();
              mR.ins_crypt_param(key, iv, function(){
                console.log("parameters created correctly");
                 cb(loadCryptParam(mR));
              });
            }
            else if(!err){ // param already exist -> simply load them
                cb(loadCryptParam(mR));
            }
            else if(err){ // trouble with loading
              console.log(errRead);
            }
        });

        middleware.load();
    }
}