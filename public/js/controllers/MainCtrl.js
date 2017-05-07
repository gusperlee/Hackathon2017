angular.module('MainCtrl', []).controller('MainController', function($scope, $location, stuff) {


  getScores = function() {
  			$scope.scores = "";
  		  stuff.getScores().then(function(data){
  			$scope.scores = data.data;
        $scope.labels = getYears($scope.scores);
        $scope.data = getRates($scope.scores);
  		});
  	};
    $scope.toggle1 = false;
    $scope.toggle2 = true;
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
     $scope.series = ['Series A']
    $scope.data = [65, 59, 80, 81, 56, 55, 40];
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
 $scope.options = {
   scales: {
     yAxes: [
       {
         id: 'y-axis-1',
         type: 'linear',
         display: true,
         position: 'left'
       },
       {
         id: 'y-axis-2',
         type: 'linear',
         display: true,
         position: 'right'
       }
     ]
   }
 };

    getScores();
    var customLyrics = "default";
    $scope.saveLyrics = function() {
        customLyrics = $scope.form;
    };
    $scope.submitForm = function() {
        console.log("posting data....");
        customLyrics = $scope.form;
        stuff.submitLyrics(customLyrics).then(function(data){
          $scope.labels2 = data.data.score;
          console.log($scope.labels2);
          $scope.labels3 = [];
          for (name in $scope.data) {
            if ($scope.data.hasOwnProperty(name)) {
        			$scope.labels3.push($scope.labels2);
        			}
            }
            $scope.labels3.push(120);
            $scope.labels3.push(0);
          $scope.data = [
      $scope.data,
      $scope.labels3
    ];

    		});

  console.log($scope.labels2);


        $scope.toggle2 = false;
        $scope.toggle1 = true;


    };

    $scope.tryAnother = function() {
      $scope.form = "";
      $scope.toggle1 = false;
      $scope.toggle2 = true;
      getScores();

    }


});
