const express = require('express');
const ditto = require('./pokemom/ditto.json');

const PORT = process.env.PORT ?? 1234;

const app = express();
app.disable('x-powered-by');

app.use(express.json())

/* app.use((req, res, next) => {
	if (req.method !== 'POST') return next();
	if (req.headers['content-type'] !== 'application/json') next();

	//solo llega request POST y content-type: application/json
	let body = '';
	//escuchar data
	req.on('data', (chunk) => {
		body += chunk.toString();
	});

	req.on('end', () => {
		const data = JSON.parse(body);
		data.timestamp = Date.now();
		//mutar request y poner info en req.body
		req.body = data;
		next();
	});
});
 */
app.get('/pokemon/ditto', (req, res) => {
	res.json(ditto);
	//res.json({ message: 'Hola' });
});

app.post('/pokemon', (req, res) => {
	res.status(201).json(req.body);
});

//última a la que va a llegar
app.use((req, res) => {
	res.status(404).send('<h1>404</h1>');
});

app.listen(PORT, () => {
	console.log(`Server listening on port http://localhost:${PORT}`);
});
