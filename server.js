var nGrams = require("word-ngrams");
var TFIDF = require("document-tfidf");
var fs = require("fs");

var jsonFile = fs.readFileSync('scores.json','utf8')

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

var averageScore = function(year) {
	var first = fs.readFileSync('' +  year + '/1.txt', 'utf8');
	var second = fs.readFileSync('' + year + '/2.txt', 'utf8');
	var firstScore = vocRichness(TFIDF.countTermFrequencies(first));
	var secondScore = vocRichness(TFIDF.countTermFrequencies(second));
	var avgScore = (firstScore + secondScore)/2;
	return avgScore;
};

var saveToJSON = function(year) {
	var thisYear = year;	
	var scores = JSON.parse(jsonFile);
	var avgScore = averageScore(thisYear);
	console.log(scores);
	scores[thisYear] = avgScore;
	console.log(JSON.stringify(scores));
	fs.writeFile('scores.json', JSON.stringify(scores), function (err) {
  	if (err) return console.log(err);
  	console.log('Hello World > helloworld.txt');
	});
		
	//var dataToAppend = ',' + year + ':' + avgScore + ''; 
	//fs.appendFile('scores.json', dataToAppend, function (err) {
  	//	if (err) throw err;
  	//	console.log('Saved!');
//});
};


saveToJSON(1956);

//saveSongStats = function(obj) {
//		var stream = fs.createWriteStream("database.json");
//stream.once('open', function(fd) {
//  stream.appendFile("" + vocRichness(TFIDF.countTermFrequencies(obj)))
//});
//};

//read files from a year

// make the average from those readings
// append to the json file like this : year:score


//fs.appendFile('scores.json', avgScore, function (err) {
//  if (err) throw err;
//  console.log('Saved!');
//});

//saveSongStats(text);
