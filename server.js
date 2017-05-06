var nGrams = require("word-ngrams");
var TFIDF = require("document-tfidf");
var fs = require("fs");

var text = fs.readFileSync('sample text','utf8')

console.log(TFIDF.countTermFrequencies(text));
console.log(text);



