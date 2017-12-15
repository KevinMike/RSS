angular.module('feedersModule', [])
    .controller('feedersController', function ($scope, $http) {
        $scope.newFeeder = {};
        $scope.editedFeeder = {};
        $scope.updateInformation = function (id) {
            return $http.put('/api/feeders/' + id, $scope.editedFeeder)
                .success(function (data, status, headers, config) {
                    $scope.newPhrase = {};
                    $.notify({
                        icon: "notifications",
                        message: "El RSS Feader fue actualizado correctamente"
                    }, {
                        type: 'success',
                        timer: 4000,
                        placement: {
                            from: 'top',
                            align: 'right'
                        }
                    });
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
        $scope.updateIndicators = function (id) {
            let serializedIndicators = $('#indicatorsForm').serializeArray();
            if (serializedIndicators.length >= 0) {
                let indicatorsObject = {indicators: []};
                serializedIndicators.forEach(function (element) {
                    indicatorsObject.indicators.push(element.value);
                });
                $http.put('/api/feeders/' + id + '/indicators', indicatorsObject)
                    .success(function (data, status, headers, config) {
                        $scope.newPhrase = {};
                        $.notify({
                            icon: "notifications",
                            message: "Indicadores actualizados"

                        }, {
                            type: 'success',
                            timer: 4000,
                            placement: {
                                from: 'top',
                                align: 'right'
                            }
                        });

                    })
                    .error(function (error, status, headers, config) {
                        $scope.newPhrase = {};
                        $.notify({
                            icon: "notifications",
                            message: "Indicadores no se pudieron actualizar: " + error.message
                        }, {
                            type: 'error',
                            timer: 4000,
                            placement: {
                                from: 'top',
                                align: 'right'
                            }
                        });
                    });
            }
        };
        $scope.updatePhrases = function (id) {
            let serializedPhrases = $('#phrasesForm').serializeArray()
            if (serializedPhrases.length >= 0) {
                let phrasesObject = {phrases: []}
                serializedPhrases.forEach(function (element) {
                    phrasesObject.phrases.push(element.value);
                });
                $http.put('/api/feeders/' + id + '/phrases', phrasesObject)
                    .success(function (data, status, headers, config) {
                        $scope.newPhrase = {};
                        $.notify({
                            icon: "notifications",
                            message: "Frases actualizadas"

                        }, {
                            type: 'success',
                            timer: 4000,
                            placement: {
                                from: 'top',
                                align: 'right'
                            }
                        });

                    })
                    .error(function (error, status, headers, config) {
                        $scope.newPhrase = {};
                        $.notify({
                            icon: "notifications",
                            message: "Frases no se pudieron actualizar: " + error.message
                        }, {
                            type: 'error',
                            timer: 4000,
                            placement: {
                                from: 'top',
                                align: 'right'
                            }
                        });
                    });
            }
        };
        $scope.updateComunicates = function (id) {
            let serializedComunicates = $('#comunicatesForm').serializeArray();
            if (serializedComunicates.length >= 0) {
                let comunicatesObject = {comunicates: []};
                serializedComunicates.forEach(function (element) {
                    comunicatesObject.comunicates.push(element.value);
                });
                $http.put('/api/feeders/' + id + '/comunicates', comunicatesObject)
                    .success(function (data, status, headers, config) {
                        $scope.newPhrase = {};
                        $.notify({
                            icon: "notifications",
                            message: "Comunicados actualizados"

                        }, {
                            type: 'success',
                            timer: 4000,
                            placement: {
                                from: 'top',
                                align: 'right'
                            }
                        });

                    })
                    .error(function (error, status, headers, config) {
                        $scope.newPhrase = {};
                        $.notify({
                            icon: "notifications",
                            message: "Comunicados no se pudieron actualizar: " + error.message
                        }, {
                            type: 'error',
                            timer: 4000,
                            placement: {
                                from: 'top',
                                align: 'right'
                            }
                        });
                    });
            }
        };
        $scope.create = function () {
            return $http.post('/api/feeders', $scope.newFeeder)
                .success(function (data, status, headers, config) {
                    $scope.newPhrase = {};
                    $.notify({
                        icon: "notifications",
                        message: "RSS Feader creado correctamente"

                    }, {
                        type: 'success',
                        timer: 4000,
                        placement: {
                            from: 'top',
                            align: 'right'
                        }
                    });
                    // Add Indicators
                    let serializedIndicators = $('#indicatorsForm').serializeArray()
                    if (serializedIndicators.length > 0) {
                        let indicatorsObject = {indicators: []}
                        serializedIndicators.forEach(function (element) {
                            indicatorsObject.indicators.push(element.value);
                        });
                        $http.put('/api/feeders/' + data._id + '/indicators', indicatorsObject)
                            .success(function (data, status, headers, config) {
                                $scope.newPhrase = {};
                                $.notify({
                                    icon: "notifications",
                                    message: "Indicadores añadidos"

                                }, {
                                    type: 'success',
                                    timer: 4000,
                                    placement: {
                                        from: 'top',
                                        align: 'right'
                                    }
                                });

                            })
                            .error(function (error, status, headers, config) {
                                $scope.newPhrase = {};
                                $.notify({
                                    icon: "notifications",
                                    message: "Indicadores no se pudieron añadir: " + error.message
                                }, {
                                    type: 'error',
                                    timer: 4000,
                                    placement: {
                                        from: 'top',
                                        align: 'right'
                                    }
                                });
                            });
                    }
                    //Add phrases
                    let serializedPhrases = $('#phrasesForm').serializeArray()
                    if (serializedPhrases.length > 0) {
                        let phrasesObject = {phrases: []}
                        serializedPhrases.forEach(function (element) {
                            phrasesObject.phrases.push(element.value);
                        });
                        $http.put('/api/feeders/' + data._id + '/phrases', phrasesObject)
                            .success(function (data, status, headers, config) {
                                $scope.newPhrase = {};
                                $.notify({
                                    icon: "notifications",
                                    message: "Frases añadidas"

                                }, {
                                    type: 'success',
                                    timer: 4000,
                                    placement: {
                                        from: 'top',
                                        align: 'right'
                                    }
                                });

                            })
                            .error(function (error, status, headers, config) {
                                $scope.newPhrase = {};
                                $.notify({
                                    icon: "notifications",
                                    message: "Frases no se pudieron añadir: " + error.message
                                }, {
                                    type: 'error',
                                    timer: 4000,
                                    placement: {
                                        from: 'top',
                                        align: 'right'
                                    }
                                });
                            });
                    }
                    //Add comunicates
                    let serializedComunicates = $('#comunicatesForm').serializeArray();
                    if (serializedComunicates.length > 0) {
                        let comunicatesObject = {comunicates: []}
                        serializedComunicates.forEach(function (element) {
                            comunicatesObject.comunicates.push(element.value);
                        });
                        $http.put('/api/feeders/' + data._id + '/comunicates', comunicatesObject)
                            .success(function (data, status, headers, config) {
                                $scope.newPhrase = {};
                                $.notify({
                                    icon: "notifications",
                                    message: "Comunicados añadidos"

                                }, {
                                    type: 'success',
                                    timer: 4000,
                                    placement: {
                                        from: 'top',
                                        align: 'right'
                                    }
                                });

                            })
                            .error(function (error, status, headers, config) {
                                $scope.newPhrase = {};
                                $.notify({
                                    icon: "notifications",
                                    message: "Comunicados no se pudieron añadir: " + error.message
                                }, {
                                    type: 'error',
                                    timer: 4000,
                                    placement: {
                                        from: 'top',
                                        align: 'right'
                                    }
                                });
                            });
                    }
                    setTimeout(function () {
                        location.pathname = '/'
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
        $scope.delete = function (value) {
            $http({
                method: 'DELETE',
                url: '/api/feeders/' + value
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
        $scope.addRow = function (tableId, rowId, rowText) {
            let tr = document.createElement('tr');
            tr.id = Math.random() * 100000000000000000;
            tr.innerHTML = '<td><input type="text" hidden="true" value="' + rowId + '" name="' + tableId + '[]" />\n' + rowText + '  </td>\n' +
                '  <td class="td-actions text-right">\n' +
                '    <button class="btn btn-danger btn-simple btn-xs pull-right" type="button" rel="tooltip" title="Eliminar" onclick="removeRow(\'' + tr.id + '\')"><i class="material-icons">close</i></button>\n' +
                '  </td>';
            document.getElementById(tableId).appendChild(tr);
        };
        $scope.addElementToTable = function (selectorId, tableId) {
            let value = document.getElementById(selectorId).value;
            let text = document.getElementById(selectorId).options[document.getElementById(selectorId).selectedIndex].innerHTML;
            $scope.addRow(tableId, value, text)
        };
    });

function removeRow(rowId) {
    var elem = document.getElementById(rowId);
    elem.parentNode.removeChild(elem);
}