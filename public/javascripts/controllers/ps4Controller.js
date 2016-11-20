var app = angular.module('PriceTracker');

app.controller('ps4Controller', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/get/platform/ps4').success(function(data) {
        $scope.ps4 = data;
    });
}]);
