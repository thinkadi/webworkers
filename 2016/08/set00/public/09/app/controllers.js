app.controller('registerController', ['$rootScope', '$scope', '$route', function ($rootScope, $scope, $route) {

    $scope.user = {};
    $scope.error = {};

    $scope.register = function () {
        console.log($scope.user);

        if (!$scope.user.email) {
            $scope.error.message = "Email cannot be blank";
        } else if (!$scope.user.password) {
            $scope.error.message = "Password cannot be blank";
        } else if (!$scope.user.name) {
            $scope.error.message = "Please enter your First Name and Last Name";
        } else if (!$scope.user.name.first) {
            $scope.error.message = "First Name cannot be blank";
        } else if (!$scope.user.name.last) {
            $scope.error.message = "Last Name cannot be blank";
        } else {
            $scope.error.message = null;
        }
    };
}]);