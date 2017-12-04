const fs = require('fs');
module.exports.readRandomLine = function (path) {
    return new Promise((resolve, reject) => {
        var input = fs.createReadStream(path,{
                encoding: 'latin1',
                fd: null,
            }),
            remaining = '',
            lines = [];
        input.on('data', function (data) {
            try {
                remaining += data;
                var index = remaining.indexOf('\n');
                while (index > -1) {
                    lines.push(remaining.substring(0, index));
                    remaining = remaining.substring(index + 1);
                    index = remaining.indexOf('\n');
                }
            }
            catch (err) {
                reject(err)
            }
        });
        input.on('end', function () {
            try {
                if (remaining.length > 0) {
                    resolve(lines[Math.floor(Math.random() * lines.length)]);
                }
            }
            catch (err) {
                reject(err);
            }
        });
    });
};
module.exports.readFile = function (path) {
    return new Promise((resolve, reject) => {
        let input = fs.createReadStream(path);
        input.on('data', function (data) {
            try {
                resolve(data)
            }
            catch (err) {
                reject(err)
            }
        });
    });
};