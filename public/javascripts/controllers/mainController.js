var app = angular.module('PriceTracker');

app.controller('mainController', ['$scope', '$http', function($scope, $http) {
    //reset active class
    var active = document.getElementsByClassName("active");
    if(active){
        while (active.length)
            active[0].className = active[0].className.replace(/\active\b/g, "");
        //add class to home.
        document.getElementById("home").className += "active";
    }

    $http.get('/api/get/all').success(function(data) {
        $scope.games = data;
    });
}]);
