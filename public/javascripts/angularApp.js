var app = angular.module('PriceTracker', ['ngRoute']);
history.replaceState('','','/');
app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "pages/main.ejs",
            controller: "mainController"
        })
        .when('/ps4', {
            templateUrl: "pages/ps4.ejs",
            controller: "ps4Controller"
        })
        .when('/xbox', {
            templateUrl: "pages/xbox.ejs",
            controller: "xboxController"
        });
});

var linkHandler = function(title,url){
    document.title = title;
    history.pushState(title,title,url);
    console.log('clicked');
}