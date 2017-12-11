angular.module('comunicatesModule', [])
    .controller('comunicatesController', function ($scope, $http) {
        $scope.setId = function (item) {
            item = JSON.parse(item);
            $scope.editedComunicate = item;
        };
        $scope.create = function () {
            return $http.post('/api/comunicates', $scope.newComunicate)
                .success(function (data, status, headers, config) {
                    $scope.newComunicate = {};
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
                    $scope.newComunicate = {};
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
            return $http.put('/api/comunicates/' + $scope.editedComunicate._id, $scope.editedComunicate)
                .success(function (data, status, headers, config) {
                    $scope.editedComunicate = {};
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
                    $scope.editedComunicate = {};
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
                url: '/api/comunicates/' + value
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
