angular.module('postService', [])
    .factory('Post', function($http) {

        var postFactory = {};

        postFactory.get = function(id) {
            return $http.get('/api/posts/' + id);
        }

        postFactory.all = function() {
            return $http.get('/api/posts/');
        }

        postFactory.post = function() {
            return $http.post('/api/posts/');
        }

        return postFactory;

    });
