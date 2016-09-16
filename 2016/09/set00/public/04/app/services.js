app.service('authService', ['$http', '$q', function ($http, $q) {

    var bearerToken;
    var bearerTokenString = localStorage.getItem("bearerTokenString");
    if (bearerTokenString) {
        bearerToken = JSON.parse(bearerTokenString);
    }

    var authUrl = "/auth";
    this.register = function (user) {
        var deferred = $q.defer();
        if (!user.email) {
            deferred.reject("Email cannot be blank");
        } else if (!user.password) {
            deferred.reject("Password cannot be blank");
        } else if (!user.name) {
            deferred.reject("Please enter your First Name and Last Name");
        } else if (!user.name.first) {
            deferred.reject("First Name cannot be blank");
        } else if (!user.name.last) {
            deferred.reject("Last Name cannot be blank");
        } else {
            var registerUrl = authUrl + "/register";
            $http.post(registerUrl, user)
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
        }
        return deferred.promise;
    };

    this.login = function (user) {
        var deferred = $q.defer();
        if (!user.email) {
            deferred.reject("Email cannot be blank");
        } else if (!user.password) {
            deferred.reject("Password cannot be blank");
        } else {
            var registerUrl = authUrl + "/bearer-token";
            $http.post(registerUrl, user)
                .success(function (response) {
                    deferred.resolve(response);
                    bearerToken = response.bearerToken;
                    localStorage.setItem("bearerTokenString", JSON.stringify(bearerToken));
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
        }
        return deferred.promise;
    };

    this.logout = function () {
        var deferred = $q.defer();
        localStorage.removeItem("bearerTokenString");
        bearerToken = null;
        deferred.resolve("User logged out successfully");
        return deferred.promise;
    };

    this.getBearerToken = function () {
        return bearerToken;
    }

}]);