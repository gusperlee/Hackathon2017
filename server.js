// Importing external npm modules
var express = require('express');
var app = express();
var path = require('path')
var express = require('express');
var bodyParser = require('body-parser');
var nGrams = require("word-ngrams");
var TFIDF = require("document-tfidf");
var fs = require("fs");
var methodOverride = require('method-override');

var port = process.env.PORT || 8080;
var jsonFile = fs.readFileSync('scores.json','utf8')

app.use(bodyParser.json());
app.use(bodyParser.json({ type : 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));
require('./app/routes.js')(app);


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
	if (year<1976) {
	var first = fs.readFileSync('eurovisionSongs/' +  year + '/1.txt', 'utf8');
	var second = fs.readFileSync('eurovisionSongs/' + year + '/2.txt', 'utf8');
	var third = fs.readFileSync('eurovisionSongs/' + year + '/3.txt', 'utf8');
	var fourth = fs.readFileSync('eurovisionSongs/' + year + '/4.txt', 'utf8');
	var fifth = fs.readFileSync('eurovisionSongs/' + year + '/5.txt', 'utf8');
	}
	else {
		var first = fs.readFileSync('eurovisionSongs/' +  year + '/1', 'utf8');
		var second = fs.readFileSync('eurovisionSongs/' + year + '/2', 'utf8');
		var third = fs.readFileSync('eurovisionSongs/' + year + '/3', 'utf8');
		var fourth = fs.readFileSync('eurovisionSongs/' + year + '/4', 'utf8');
		var fifth = fs.readFileSync('eurovisionSongs/' + year + '/5', 'utf8');
	}
	var firstScore = vocRichness(TFIDF.countTermFrequencies(first));
	var secondScore = vocRichness(TFIDF.countTermFrequencies(second));
	var thirdScore = vocRichness(TFIDF.countTermFrequencies(third));
	var fourthScore = vocRichness(TFIDF.countTermFrequencies(fourth));
	var fifthScore = vocRichness(TFIDF.countTermFrequencies(fifth));
	var avgScore = (firstScore + secondScore + thirdScore + fourthScore + fifthScore)/5;
	return avgScore;

};

var saveToJSON = function(obj) {
	var bla = JSON.stringify(obj);
	fs.writeFileSync('scores.json', bla);
};

crunchNumbers = function() {
	var object = {};
	var i = 1956;
	while (i<2013) {
		object[i] = averageScore(i);
		console.log(object[i])
		i++;
	}
	return object;
};

// this runs once to crunch all the data and save it to the json file
//saveToJSON(crunchNumbers());

app.listen(port);
exports = module.exports = app;
