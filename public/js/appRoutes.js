angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider
    //route for main page PLACEHOLDER,get rid of it
    .when('/', {
      templateUrl : 'views/landing.html'
    })

		// route for the packages page
		.when('/submit', {
			templateUrl : 'views/submit.html'
		});

	$locationProvider.html5Mode(true);

});
