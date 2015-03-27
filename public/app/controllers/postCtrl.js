angular.module('postCtrl', ['postService'])
    .controller('postController', function(Post, $routeParams) {
        var vm = this;

        Post.all()
            .success(function(data) {
                vm.posts = data;
            });

        Post.get($routeParams.user_id)
            .success(function(data) {
                vm.post = data;
            });

    });
