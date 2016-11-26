/**
 * Created by jorge on 21/11/16.
 */
app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state("home", {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: "HomeController"
        })
        .state("register-cat", {
            url: '/cats/new',
            templateUrl: 'templates/cats/create.html',
            controller: "CatSaveController"
        })
        .state("list-cats", {
            url: "/cats",
            templateUrl: 'templates/cats/list.html',
            controller: "CatsListController"
        })
        .state("/login", {
            url: "/login",
            templateUrl: "login.html",
            controller: "LoginController"
        });

    $urlRouterProvider.otherwise("/");
});