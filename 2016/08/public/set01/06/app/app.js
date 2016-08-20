var app = angular.module('shoppingListApp', ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'app/views/home.html'
    });
});

app.config(function ($routeProvider) {
    $routeProvider.
    when('/signup', {
        templateUrl: 'app/views/signup.html'
    });
});

app.config(function ($routeProvider) {
    $routeProvider.
    when('/login', {
        templateUrl: 'app/views/login.html'
    });
});

app.config(function ($routeProvider) {
    $routeProvider.
    when('/my-list', {
        templateUrl: 'app/views/my-list.html'
    });
});