angular.module('authService', [])
    .factory('Auth', function($http, $q, AuthToken) {

        var authFactory = {};

        authFactory.login = function(email, password) {
            return $http.post('/api/authenticate', {

                email: email,
                password: password

            }).success(function(data) {

                AuthToken.setToken(data.token);
                return data;

            });
        };

        authFactory.isLoggedIn = function() {
            if (AuthToken.getToken()) {
                return true;
            } else {
                return false;
            }
        }

        return authFactory;
    })

    .factory('AuthToken', function($window) {

        var authTokenFactory = {};

        // get the token out of local storage
        authTokenFactory.getToken = function() {
            return $window.localStorage.getItem('token');
        };

        // function to set token or clear token
        // if a token is passed, set the token
        // if there is no token, clear it from local storage
        authTokenFactory.setToken = function(token) {
            if (token)
                $window.localStorage.setItem('token', token);
            else
                $window.localStorage.removeItem('token');
        };

	return authTokenFactory;


    })

    .factory('AuthInterceptor', function($q, $location, AuthToken) {

    	var interceptorFactory = {};

    	// this will happen on all HTTP requests
    	interceptorFactory.request = function(config) {

    		// grab the token
    		var token = AuthToken.getToken();

    		// if the token exists, add it to the header as x-access-token
    		if (token)
    			config.headers['x-access-token'] = token;

    		return config;
    	};

    	// happens on response errors
    	interceptorFactory.responseError = function(response) {

    		// if our server returns a 403 forbidden response
    		if (response.status == 403) {
    			AuthToken.setToken();
    			$location.path('/login');
    		}

    		// return the errors from the server as a promise
    		return $q.reject(response);
    	};

	    return interceptorFactory;

});
