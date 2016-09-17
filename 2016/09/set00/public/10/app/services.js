(function () {
    var user = {};

    var userString = localStorage.getItem("userString");
    if (userString) {
        user = JSON.parse(userString);
    }

    var authUrl = "/auth";
    var apiUrl = "/api"
    var usersUrl = apiUrl + "/users";
    var itemsUrl = apiUrl + "/items"

    app.service('authService', ['$http', '$q', function ($http, $q) {

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

        this.login = function (loginUser) {
            var deferred = $q.defer();
            if (!loginUser.email) {
                deferred.reject("Email cannot be blank");
            } else if (!loginUser.password) {
                deferred.reject("Password cannot be blank");
            } else {
                var registerUrl = authUrl + "/bearer-token";
                $http.post(registerUrl, loginUser)
                    .success(function (response) {
                        deferred.resolve(response);
                        user.loggedIn = true;
                        user.bearerToken = response.bearerToken;
                        localStorage.setItem("userString", JSON.stringify(user));
                    })
                    .error(function (err, status) {
                        deferred.reject(err);
                    });
            }
            return deferred.promise;
        };

        this.logout = function () {
            var deferred = $q.defer();
            localStorage.removeItem("userString");
            user = {};
            deferred.resolve("User logged out successfully");
            return deferred.promise;
        };

    }]);

    app.service('usersService', ['$http', '$q', function ($http, $q) {

        this.getUser = function () {
            return user;
        };

        this.loadUserInfo = function () {
            var deferred = $q.defer();
            var thisUserUrl = usersUrl + "/me";
            $http({
                    method: 'GET',
                    url: thisUserUrl,
                    headers: {
                        "Authorization": "Bearer" + " " + user.bearerToken.token
                    }
                })
                .success(function (response) {
                    deferred.resolve(response);
                    user.email = response.email;
                    user.name = response.name;
                    localStorage.setItem("userString", JSON.stringify(user));
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

    }]);

    app.service('itemsService', ['$http', '$q', function ($http, $q) {

        this.getItems = function () {
            var deferred = $q.defer();
            $http({
                    method: 'GET',
                    url: itemsUrl,
                    headers: {
                        "Authorization": "Bearer" + " " + user.bearerToken.token
                    }
                })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        this.postItem = function (item) {
            var deferred = $q.defer();
            $http({
                    method: 'POST',
                    url: itemsUrl,
                    headers: {
                        "Authorization": "Bearer" + " " + user.bearerToken.token
                    },
                    data: item
                })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

        this.deleteItem = function (item) {
            var deferred = $q.defer();
            var itemUrl = itemsUrl + "/" + item.id;
            $http({
                    method: 'DELETE',
                    url: itemUrl,
                    headers: {
                        "Authorization": "Bearer" + " " + user.bearerToken.token
                    },
                    data: item
                })
                .success(function (response) {
                    deferred.resolve(response);
                })
                .error(function (err, status) {
                    deferred.reject(err);
                });
            return deferred.promise;
        };

    }]);

})();