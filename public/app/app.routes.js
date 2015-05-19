angular.module('app.routes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

		// route for the home page
		.when('/', {
			templateUrl: 'app/views/pages/posts.html',
			controller: 'postController',
			controllerAs: 'post'
		})

		.when('/posts/:post_id', {
			templateUrl: 'app/views/pages/postSingle.html',
			controller: 'postController',
			controllerAs: 'post'
		})

		.when('/admin', {
			templateUrl: 'app/views/pages/admin.html',
			controller: 'postController',
			controllerAs: 'post'
		})

		.when('/about', {
			templateUrl: 'app/views/pages/about.html'
		})

		.otherwise({
			redirectTo: '/'
		})

    $locationProvider.html5Mode(true);

});
