var app = angular.module('PriceTracker');

app.controller('mainController', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/get/all').success(function(data) {
        $scope.games = data;
    });
}]);
