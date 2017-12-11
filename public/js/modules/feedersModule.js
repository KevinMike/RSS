angular.module('indicatorsModule', [])
    .controller('indicatorsController', function ($scope, $http) {
        $scope.newFeeder = {};
        $scope.indicators = [];
        $scope.phrases = [];
        $scope.comunicates = [];
        $scope.setId = function (item) {
            item = JSON.parse(item);
            $scope.editedIndicator = item;
        };
        $scope.addIndicator = function () {
            let value = document.getElementById('indicatorsSelector').value;
            let text = document.getElementById('indicatorsSelector').options[document.getElementById('indicatorsSelector').selectedIndex].innerHTML;
            addRow(value,text)
        };
    });
function addRow(value,text) {
    var tr = document.createElement('tr');
    tr.innerHTML = '<tr id="'+text+'">\n' +
        '  <td>\n' +
        text+'\n' +
        '  </td>\n' +
        '  <td class="td-actions text-right">\n' +
        '    <button class="btn btn-danger btn-simple btn-xs" type="button" rel="tooltip" title="Eliminar"><i class="material-icons">close</i></button>\n' +
        '  </td>\n' +
        '</tr>';
    document.getElementById('indicatorsTable').appendChild(tr);
}

function removeRow(input) {
    document.getElementById('content').removeChild( input.parentNode );
}