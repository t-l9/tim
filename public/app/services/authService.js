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

});
