var nGrams = require("word-ngrams");
var TFIDF = require("document-tfidf");
var fs = require("fs");

var text = fs.readFileSync('sample text','utf8')


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

saveSongStats = function(obj) {
		var stream = fs.createWriteStream("database.json");
stream.once('open', function(fd) {
  stream.write("" + vocRichness(TFIDF.countTermFrequencies(obj)))
});
};

console.log(TFIDF.countTermFrequencies(text));
console.log(vocRichness(TFIDF.countTermFrequencies(text)));
saveSongStats(text);



