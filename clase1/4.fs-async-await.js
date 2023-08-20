const { readFile } = require('node:fs/promises');

// IIFE - inmediately Invoked Function Expression
(async () => {
	console.log('Leyendo el primer archivo');
	const text = await readFile('./archivo.txt', 'utf-8');
	console.log(text);

	console.log('---> haciendo cositas mientras lee el archivo...');

	console.log('Leyendo el segundo archivo');
	const secondText = await readFile('./archivo2.txt', 'utf-8');
	console.log(secondText);
})();
