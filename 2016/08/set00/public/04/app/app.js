var app = angular.module('shoppingListApp', ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'app/views/home.html'
    });
});