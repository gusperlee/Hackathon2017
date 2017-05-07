var fs = require("fs");
var path = require('path');
var nGrams = require("word-ngrams");
var TFIDF = require("document-tfidf");

vocRichness = function(obj) {
	var key = 0;
	var uniqueWords = 0;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			uniqueWords += obj[key].length;
			}
		}
	return uniqueWords;
};


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
    var lyrics = req.body.lyrics;
    console.log(vocRichness(TFIDF.countTermFrequencies(lyrics)));
    res.send({ score : vocRichness(TFIDF.countTermFrequencies(lyrics))});
  })
  app.get('*', function(req,res) {
    res.sendFile(path.resolve('public/views/index.html'));
  });

};
