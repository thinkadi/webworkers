app.controller('registerController', ['$rootScope', '$scope', '$route', function ($rootScope, $scope, $route) {

    $scope.user = {};

    $scope.register = function () {
        console.log($scope.user);
    };

}]);