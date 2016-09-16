app.controller('registerController', ['$rootScope', '$scope', '$location', 'authService', function ($rootScope, $scope, $location, authService) {
    $scope.registerUser = {};
    $scope.error = {};
    $scope.register = function () {
        authService.register($scope.registerUser)
            .then(function (response) {
                $location.path("/");
            }, function (errorMessage) {
                $scope.error.message = errorMessage;
            });
    };
    }]);