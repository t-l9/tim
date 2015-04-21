angular.module('postCtrl', ['postService'])
    .controller('postController', function(Post, $routeParams) {
        var vm = this;

        Post.all()
            .success(function(data) {
                vm.posts = data;

                for(i=0; i < vm.posts.length; i++) {

                    if(data[i].date) {

                        var year     = null
                        var monthDay = null

                        data[i].date = data[i].date.slice(0,data[i].date.indexOf('T'));
                        data[i].date = data[i].date.replace(/-/g, '/');

                        year     = data[i].date.slice(0, 4);
                        monthDay = data[i].date.slice(5, data[i].date.length);

                        data[i].date = monthDay +'/' + year;

                    }

                };

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
