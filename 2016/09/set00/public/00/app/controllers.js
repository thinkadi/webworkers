app.controller('registerController', ['$rootScope', '$scope', '$location', 'authService', function ($rootScope, $scope, $location, authService) {
    $scope.user = {};
    $scope.error = {};
    $scope.register = function () {
        authService.register($scope.user)
            .then(function (response) {
                $location.path("/");
            }, function (errorMessage) {
                $scope.error.message = errorMessage;
            });
    };
    }]);