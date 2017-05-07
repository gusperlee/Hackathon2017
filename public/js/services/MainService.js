angular.module('MainService', [])
  .factory('stuff', ['$http', function($http) {

    var stuffFactory = {};
    stuffFactory.getScores = function() {
		// return the promise object and its data
		return $http.get('/api/stats');
  };
    stuffFactory.submitLyrics = function(lyricsText) {
      return $http.post('/api/lyrics', lyricsText);
    };
return stuffFactory;
}]);
