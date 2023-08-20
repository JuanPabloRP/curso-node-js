//Ejemplo sincrono
const fs = require('node:fs');

console.log('Leyendo el primer archivo');
fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
	console.log(text);
});

console.log('---> haciendo cositas mientras lee el archivo...');

console.log('Leyendo el segundo archivo');
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
	console.log(text);
});

//-- esto solo en los modulos nativos que no tienen promesas
/* 
const { promisify } = require('node:util');


const fsPromise = promisify(fs.readFile);

console.log('Leyendo el primer archivo');
fsPromise.readFile('./archivo.txt', 'utf-8', (err, text) => {
	console.log(text);
});
 */

//sincrono
/*
console.log('Leyendo el primer archivo');
const text = fs.readFileSync('./archivo.txt', 'utf-8');
console.log(text);

console.log('haciendo cositas...');

console.log('Leyendo el segundo archivo');
const text2 = fs.readFileSync('./archivo2.txt', 'utf-8');
console.log(text2);

*/
