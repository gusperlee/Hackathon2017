var fs = require("fs");
var path = require('path');

module.exports = function(app) {
  app.get('/api/stats', function(req, res) {
    var file = fs.readFileSync('scores.json', 'utf8');
    console.log(file);
    JSONobj = JSON.parse(file);


    res.send(JSONobj);

  });

  app.post('/api/lyrics', function(req, res) {
    //do the overlay with the standard stuff
    console.log("someonesubmittedlyrics");
  })
  app.get('*', function(req,res) {
    res.sendFile(path.resolve('public/views/index.html'));
  });
  
};
