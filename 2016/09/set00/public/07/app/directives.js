app.directive("navBar", function () {
    return {
        templateUrl: 'app/templates/nav-bar.html',
        controller: 'navBarController'
    };
});

app.directive("home", function () {
    return {
        templateUrl: 'app/templates/home.html'
    };
});

app.directive("register", function () {
    return {
        templateUrl: 'app/templates/register.html',
        controller: 'registerController'
    };
});

app.directive("login", function () {
    return {
        templateUrl: 'app/templates/login.html',
        controller: 'loginController'
    };
});

app.directive("myList", function () {
    return {
        templateUrl: 'app/templates/my-list.html',
        controller: 'myListController'
    };
});