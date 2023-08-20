const path = require('node:path');

//barra separada segun OS
console.log(path.sep);

//
const filePath = path.join('content', 'subcontent', 'test.js');
console.log(filePath);

//file name
const base = path.basename('/tmp/secret-files/passwords.txt');
console.log(base);

const filename = path.basename('/tmp/secret-files/pass.txt', '.txt');
console.log(filename);

//

const extension = path.extname('image.jpg');
console.log(extension);
