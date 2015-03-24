angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		// route for the home page
		.when('/', {
            templateUrl: 'app/views/pages/test.html'
		})

		// login page
		.when('/admin', {
            templateUrl: 'app/views/pages/admin.html'
		});

    $locationProvider.html5Mode(true);

});
