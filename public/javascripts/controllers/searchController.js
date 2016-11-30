var app = angular.module('PriceTracker');

app.controller('searchController', ['$scope', '$http','$routeParams', function($scope, $http,$routeParams) {
    var active = document.getElementsByClassName("active");
    if(active){
        while (active.length)
            active[0].className = active[0].className.replace(/\active\b/g, "");
        //add class to home.
    }
    $http.get('/api/get/game/' + $routeParams.name).success(function(data) {
        console.log(data);
        $scope.games = data;
    });
}]);

var searchForGame = function(){
    var name = document.getElementById("searchText").value;
    window.location = "#/search/" + name;
};
