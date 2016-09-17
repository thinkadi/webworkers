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

app.controller('myListController', ['$rootScope', '$scope', '$location', '$route', 'itemsService', function ($rootScope, $scope, $location, $route, itemsService) {
    $scope.error = {};
    itemsService.getItems()
        .then(function (response) {
            $scope.items = response;
        }, function (errorMessage) {
            $scope.error.message = errorMessage;
        });

    $scope.goToAddItem = function () {
        $location.path("/my-list-add");
    }

    $scope.delete = function (index) {
        var deleteItem = $scope.items[index];
        itemsService.deleteItem(deleteItem)
            .then(function (response) {
                $route.reload();
            }, function (errorMessage) {
                $scope.error.message = errorMessage;
            });
    }
}]);

app.controller('myListAddController', ['$rootScope', '$scope', '$location', 'itemsService', function ($rootScope, $scope, $location, itemsService) {
    $scope.addItem = {};
    $scope.error = {};

    $scope.add = function () {
        itemsService.postItem($scope.addItem)
            .then(function (response) {
                $location.path("/my-list");
            }, function (errorMessage) {
                $scope.error.message = errorMessage;
            });
    }
}]);