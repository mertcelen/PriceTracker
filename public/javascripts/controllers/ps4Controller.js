var app = angular.module('PriceTracker');

app.controller('ps4Controller', ['$scope', '$http', function ($scope, $http) {
    var active = document.getElementsByClassName("active");
    if(active){
        while (active.length)
            active[0].className = active[0].className.replace(/\active\b/g, "");
        //add class to home.
        document.getElementById("ps4").className += "active";
    }
    $http.get('/api/get/platform/ps4').success(function (data) {
        console.log("got data");
        console.log(data);
        $scope.games = data;
    });
}]);
