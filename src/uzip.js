var fs = require('fs');
var zlib = require('zlib');

var gunzip = zlib.createGunzip();

var inFile = fs.createReadStream('./1.jpg.gz');
var outFile = fs.createWriteStream('./2.jpg');

inFile.pipe(gunzip).pipe(outFile);