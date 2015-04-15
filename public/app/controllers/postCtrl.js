angular.module('postCtrl', ['postService'])
    .controller('postController', function(Post, $routeParams) {
        var vm = this;

        function nl2br(str) {

            return str.replace(/\\n/g, "<br />");
        }


        Post.all()
            .success(function(data) {
                vm.posts = data;

                for(i=0; i < vm.posts.length; i++) {

                    data[i].content = nl2br(data[i].content);
                };

                vm.posts = data;


             });

        Post.get($routeParams.user_id)
            .success(function(data) {
                vm.post = data;
            });

        vm.createPost = function() {
            Post.post(postData)
                .success(function(data) {
                    console.log(data);
                });

        }

    });
