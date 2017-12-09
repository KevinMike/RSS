angular.module('phrasesModule', [])
    .controller('phrasesController', function ($scope) {
        $scope.create = function () {
            console.log('se creoooo' + $scope.newPhrase);
            $scope.newPhrase = {}
        }
    });