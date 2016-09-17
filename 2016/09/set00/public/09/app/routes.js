app.config(function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'app/views/home.html'
    });
});

app.config(function ($routeProvider) {
    $routeProvider.
    when('/register', {
        templateUrl: 'app/views/register.html'
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

app.config(function ($routeProvider) {
    $routeProvider.
    when('/my-list-add', {
        templateUrl: 'app/views/my-list-add.html'
    });
});