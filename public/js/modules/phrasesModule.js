angular.module('phrasesModule', [])
    .controller('phrasesController', function ($scope, $http) {
        $scope.setId = function (item) {
            item = JSON.parse(item);
            $scope.editedPhrase = item;
        };
        $scope.create = function () {
            return $http.post('/api/phrases', $scope.newPhrase)
                .success(function (data, status, headers, config) {
                    $scope.newPhrase = {};
                    $.notify({
                        icon: "notifications",
                        message: "El registro se ingresó correctamente"

                    }, {
                        type: 'success',
                        timer: 4000,
                        placement: {
                            from: 'top',
                            align: 'right'
                        }
                    });
                    setTimeout(function () {
                        location.reload();
                    }, 3000);

                })
                .error(function (error, status, headers, config) {
                    $scope.newPhrase = {};
                    $.notify({
                        icon: "notifications",
                        message: "Error: " + error.message
                    }, {
                        type: 'error',
                        timer: 4000,
                        placement: {
                            from: 'top',
                            align: 'right'
                        }
                    });
                });
        };
        $scope.update = function () {
            return $http.put('/api/phrases/' + $scope.editedPhrase._id, $scope.editedPhrase)
                .success(function (data, status, headers, config) {
                    $scope.editedPhrase = {};
                    $.notify({
                        icon: "notifications",
                        message: "El registro se editó correctamente"

                    }, {
                        type: 'success',
                        timer: 4000,
                        placement: {
                            from: 'top',
                            align: 'right'
                        }
                    });
                    setTimeout(function () {
                        location.reload();
                    }, 3000);
                })
                .error(function (error, status, headers, config) {
                    $scope.editedPhrase = {};
                    $.notify({
                        icon: "notifications",
                        message: "Error: " + error.message
                    }, {
                        type: 'error',
                        timer: 4000,
                        placement: {
                            from: 'top',
                            align: 'right'
                        }
                    });
                })
        };
        $scope.delete = function (value) {
            $http({
                method: 'DELETE',
                url: '/api/phrases/' + value
            })
                .success(function (data, status, headers, config) {
                    $.notify({
                        icon: "notifications",
                        message: "El registro se eliminó correctamente"

                    }, {
                        type: 'success',
                        timer: 4000,
                        placement: {
                            from: 'top',
                            align: 'right'
                        }
                    });

                    setTimeout(function () {
                        location.reload();
                    }, 3000);

                })
                .error(function (error, status, headers, config) {
                    $.notify({
                        icon: "notifications",
                        message: "Error: " + error.message
                    }, {
                        type: 'error',
                        timer: 4000,
                        placement: {
                            from: 'top',
                            align: 'right'
                        }
                    });
                });
        };
    });
