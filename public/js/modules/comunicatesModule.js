angular.module('comunicatesModule', [])
    .controller('comunicatesController', function ($scope) {
        $scope.create = function () {
            console.log('se creoooo' + $scope.newComunicate);
            $scope.newComunicate = {}
        }
    });