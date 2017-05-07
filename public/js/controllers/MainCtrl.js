angular.module('MainCtrl', []).controller('MainController', function($scope, $location, stuff) {


  getScores = function() {
  			$scope.scores = "";
  		stuff.getScores().then(function(data){
  			$scope.scores = data.data;
        $scope.labels = getYears($scope.scores);
        $scope.data = getRates($scope.scores);
  		});
  	};

    getYears = function(obj) {
    	var name;
    	var years = [];
    	for (name in obj) {
        if (obj.hasOwnProperty(name)) {
    			years.push(name);
    			}

    		}
    	return years;
    };

    getRates = function(obj) {
    	var name;
    	var rates = [];
    	for (name in obj) {
    			rates.push(obj[name]);
    		}
    	return rates;
    };

    $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
    $scope.data = [65, 59, 80, 81, 56, 55, 40];
getScores();



});
