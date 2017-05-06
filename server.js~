// Importing external npm modules
var express = require('express');
var path = require('path')
var express = require('express');
var bodyParser = require('body-parser');
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
	var third = fs.readFileSync('' + year + '/3.txt', 'utf8');
	var fourth = fs.readFileSync('' + year + '/4.txt', 'utf8');
	var fifth = fs.readFileSync('' + year + '/5.txt', 'utf8');
	var firstScore = vocRichness(TFIDF.countTermFrequencies(first));
	var secondScore = vocRichness(TFIDF.countTermFrequencies(second));
	var secondScore = vocRichness(TFIDF.countTermFrequencies(third));
	var secondScore = vocRichness(TFIDF.countTermFrequencies(fourth));
	var secondScore = vocRichness(TFIDF.countTermFrequencies(fifth));
	var avgScore = (firstScore + secondScore + thirdScore + fourthScore + fifthScore)/5;
	return avgScore;
};

var saveToJSON = function(year) {
	var scores = JSON.parse(jsonFile);
	var avgScore = averageScore(year);
	console.log(scores);
	scores[year] = avgScore;
	console.log(JSON.stringify(scores));
	fs.writeFile('scores.json', JSON.stringify(scores), function (err) {
  	if (err) return console.log(err);
	});
};


//todo : map the saveToJSON to our app using express




//fs.appendFile('scores.json', avgScore, function (err) {
//  if (err) throw err;
//  console.log('Saved!');
//});

//saveSongStats(text);
