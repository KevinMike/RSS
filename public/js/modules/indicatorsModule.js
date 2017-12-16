angular.module('indicatorsModule', [])
    .controller('indicatorsController', function ($scope, $http) {
        $scope.setId = function (item) {
            item = JSON.parse(item);
            $scope.editedIndicator = item;
        };
        $scope.create = function () {
            return $http.post('/api/indicators', $scope.newIndicator)
                .success(function (data, status, headers, config) {
                    $scope.newIndicator = {};
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
            return $http.put('/api/indicators/' + $scope.editedIndicator._id, $scope.editedIndicator)
                .success(function (data, status, headers, config) {
                    $scope.editedIndicator = {};
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
                url: '/api/indicators/' + value
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
