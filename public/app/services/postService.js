angular.module('postService', [])
    .factory('Post', function($http) {

        var postFactory = {};

        postFactory.get = function(url) {
            return $http.get('/api/posts/' + url);
        }

        postFactory.all = function() {
            return $http.get('/api/posts/');
        }

        postFactory.post = function(postData) {
            return $http.post('/api/posts/', postData);
        }

        return postFactory;

    });
