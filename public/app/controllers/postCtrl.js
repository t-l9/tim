angular.module('postCtrl', ['postService'])
    .controller('postController', function(Post, $routeParams) {
        var vm = this;

        // function nl2br(postContent) {
        //     console.log(postContent);
        //     return postContent.replace('\n', '<br>');
        // };

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

                console.log(vm.posts);

             });

        Post.get($routeParams.user_id)
            .success(function(data) {
                vm.post = data;
            });

    });
