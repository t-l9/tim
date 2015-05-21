angular.module('authService', [])
    .factory('Auth', function($http, $q, AuthToken) {
        return {
            login: function(email, password) {
                return $http.post('/api/authenticate', {

                    email: email,
                    password: password

                }).success(function(data) {

                    AuthToken.setToken(data.token);
                    return data;

                });
            },

            isLoggedIn: function() {
                if (AuthToken.getToken()) {
                    return true;
                } else {
                    return false;
                }
            }
        };

    })

    .factory('AuthToken', function($window) {
        return {

            getToken: function() {
                return $window.localStorage.getItem('token');
            },

            setToken: function(token) {
                if (token)
                    $window.localStorage.setItem('token', token);
                else
                    $window.localStorage.removeItem('token');
            }
        };
    })

    .factory('AuthInterceptor', function($q, $location, AuthToken) {

        return {
            // this will happen on all HTTP requests
        	request: function(config) {

        		// grab the token
        		var token = AuthToken.getToken();

        		// if the token exists, add it to the header as x-access-token
        		if (token)
        			config.headers['x-access-token'] = token;

        		return config;
        	},

        	// happens on response errors
        	responseError: function(response) {

        		// if our server returns a 403 forbidden response
        		if (response.status == 403) {
        			AuthToken.setToken();
        			$location.path('/login');
        		}

        		// return the errors from the server as a promise
        		return $q.reject(response);
        	}

        };

    });
