var app = angular.module('PriceTracker');

app.controller('xboxController', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/get/platform/xbox').success(function(data) {
        $scope.xbox = data;
    });
}]);
