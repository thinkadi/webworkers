app.service('authService', ['$http', '$q', function ($http, $q) {
    var authUrl = "/auth";
    this.register = function (registerUser) {
        var deferred = $q.defer();
        if (!registerUser.email) {
            deferred.reject("Email cannot be blank");
        } else if (!registerUser.password) {
            deferred.reject("Password cannot be blank");
        } else if (!registerUser.name) {
            deferred.reject("Please enter your First Name and Last Name");
        } else if (!registerUser.name.first) {
            deferred.reject("First Name cannot be blank");
        } else if (!registerUser.name.last) {
            deferred.reject("Last Name cannot be blank");
        } else {
            var registerUrl = authUrl + "/register";
            $http.post(registerUrl, registerUser)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
        }
        return deferred.promise;
    };
}]);