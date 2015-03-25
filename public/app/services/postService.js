angular.module('postService', [])
    .factory('Post', function($http) {
        return {
            all: function() {
                return $http.get('/api/posts/');
            },
            post: function() {
                return $http.post('/api/posts/')
            }
        };
    });
