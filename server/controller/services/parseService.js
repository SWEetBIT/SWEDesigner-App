const mu = require('mu2');

module.exports = {
  parsing: function(template, myMu, cb){
    const chunks = [];
    mu.render(template, myMu).on('data', function(data){
      chunks.push(data.toString());
    });
    mu.render(template, myMu).on('end', function(){
      var parsed = chunks.join('');
      cb(parsed);
    })
  }
};