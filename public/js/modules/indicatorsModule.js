angular.module('indicatorsModule', [])
    .controller('indicatorsController', function ($scope) {
        $scope.create = function () {
            console.log('se creoooo' + $scope.newIndicator);
            $scope.newIndicator = {}
        }
    });