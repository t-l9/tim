angular.module('postCtrl', ['postService'])
    .controller('postController', function(Post, $routeParams) {
        var vm = this;


        // var nl2br = function(str) {
        //
        //     if (str.length) {
        //         return str.replace(/\\n/g, "<br />");
        //     } else {
        //         console.log('Post content is empty');
        //     }
        //
        // }


        Post.all()
            .success(function(data) {
                vm.posts = data;

                // for(i=0; i < vm.posts.length; i++) {
                //
                //     data[i].content = nl2br(data[i].content);
                // };

                vm.posts = data;


             });

        Post.get($routeParams.user_id)
            .success(function(data) {
                vm.post = data;
            });


        vm.createPost = function(postData) {
            Post.post(postData)
                .success(function(data) {
                    console.log(data);
                })

                .error(function(error) {
                    console.log(error);
                });

        }

    });
