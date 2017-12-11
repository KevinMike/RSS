angular.module('indicatorsModule', [])
    .controller('indicatorsController', function ($scope, $http) {
        $scope.newFeeder = {};
        $scope.create = function () {
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
                        let serializedIndicators = $('#indicatorsForm').serializeArray()
                        if (serializedIndicators.length > 0) {
                            let indicatorsObject = {indicators: []}
                            serializedIndicators.forEach(function (element) {
                                indicatorsObject.indicators.push(element.value);
                            });
                            console.log(indicatorsObject);
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