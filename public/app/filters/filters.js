angular.module('postFilter', [])
    .filter('postContent', function($sce) {
        return function(input) {
            return $sce.trustAsHtml(input);
    };
});
