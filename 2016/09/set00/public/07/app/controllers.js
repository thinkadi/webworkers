app.controller('registerController', ['$rootScope', '$scope', '$location', 'authService', 'usersService', function ($rootScope, $scope, $location, authService, usersService) {
    $scope.registerUser = {};
    $scope.error = {};
    $scope.register = function () {
        authService.register($scope.registerUser)
            .then(function (response) {
                var loginUser = {};
                loginUser.email = $scope.registerUser.email;
                loginUser.password = $scope.registerUser.password;
                authService.login(loginUser)
                    .then(function (response) {
                        usersService.loadUserInfo()
                            .then(function (response) {
                                $rootScope.user = usersService.getUser();
                                $location.path("/");
                            });
                    });
            }, function (errorMessage) {
                $scope.error.message = errorMessage;
            });
    };
    }]);

app.controller('loginController', ['$rootScope', '$scope', '$location', 'authService', 'usersService', function ($rootScope, $scope, $location, authService, usersService) {
    $scope.loginUser = {};
    $scope.error = {};
    $scope.login = function () {
        authService.login($scope.loginUser)
            .then(function (response) {
                usersService.loadUserInfo()
                    .then(function (response) {
                        $rootScope.user = usersService.getUser();
                        $location.path("/");
                    });
            }, function (errorMessage) {
                $scope.error.message = errorMessage;
            });
    };
    }]);

app.controller('navBarController', ['$rootScope', '$scope', '$location', 'authService', 'usersService', function ($rootScope, $scope, $location, authService, usersService) {

    $rootScope.user = usersService.getUser();

    $scope.logout = function () {
        authService.logout();
        $rootScope.user = usersService.getUser();
        $location.path("/");
    };
    }]);

app.controller('myListController', ['$rootScope', '$scope', '$location', 'itemsService', function ($rootScope, $scope, $location, itemsService) {
    $scope.error = {};
    itemsService.getItems()
        .then(function (response) {
            $scope.items = response;
        }, function (errorMessage) {
            $scope.error.message = errorMessage;
        });
}]);