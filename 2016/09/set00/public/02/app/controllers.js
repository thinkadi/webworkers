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

app.controller('loginController', ['$rootScope', '$scope', '$location', 'authService', function ($rootScope, $scope, $location, authService) {
    $scope.loginUser = {};
    $scope.error = {};
    $scope.login = function () {
        authService.login($scope.loginUser)
            .then(function (response) {
                $rootScope.user = authService.getUser();
                $location.path("/");
            }, function (errorMessage) {
                $scope.error.message = errorMessage;
            });
    };
    }]);