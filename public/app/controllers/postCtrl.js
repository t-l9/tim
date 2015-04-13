angular.module('postCtrl', ['postService'])
    .controller('postController', function(Post, $routeParams) {
        var vm = this;

        Post.all()
            .success(function(data) {
                vm.posts = data;
                //nl2br function here!!!
                console.log(vm.posts);
            });

        Post.get($routeParams.user_id)
            .success(function(data) {
                vm.post = data;
            });

    });
