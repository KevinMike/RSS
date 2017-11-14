const fs = require('fs');
function readLines(input) {
    return new Promise((resolve, reject)=>{
        var remaining = '';
        var lines = [];
        input.on('data', function(data) {
            remaining += data;
            var index = remaining.indexOf('\n');
            while (index > -1) {
                lines.push(remaining.substring(0, index));
                remaining = remaining.substring(index + 1);
                index = remaining.indexOf('\n');
            }
        });
        input.on('end', function() {
            if (remaining.length > 0) {
                resolve(lines);
            }
        });
    });
}
module.exports = readLines;