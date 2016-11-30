var app = angular.module('PriceTracker');

app.controller('xboxController', ['$scope', '$http', function($scope, $http) {
    var active = document.getElementsByClassName("active");
    if(active){
        while (active.length)
            active[0].className = active[0].className.replace(/\active\b/g, "");
        //add class to home.
        document.getElementById("xbox").className += "active";
    }
    $http.get('/api/get/platform/xbox').success(function(data) {
        $scope.games = data;
    });
}]);
