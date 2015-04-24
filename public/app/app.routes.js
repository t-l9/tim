angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl: 'app/views/pages/posts.html',
			controller: 'postController',
			controllerAs: 'post'
		})

		// .when('/:user_id', {
		// 	templateUrl: 'app/views/pages/postSingle.html',
		// 	controller: 'postController',
		// 	controllerAs: 'post'
		// })
		//
		// login page

		// .when('/user_id', {
		// 	templateUrl: 'app/views/pages/postSinge.html'
		// });

		.when('/admin', {
			templateUrl: 'app/views/pages/admin.html',
			controller: 'postController',
			controllerAs: 'post'
		})

		.when('/login', {
			templateUrl: 'app/views/pages/login.html',
			controller: 'postController',
			controllerAs: 'post'
		})

		.otherwise({
			redirectTo: '/'
		})

    $locationProvider.html5Mode(true);

});
