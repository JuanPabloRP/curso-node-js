const http = require('node:http');
const { findAvailablePort } = require('./10.free-port');

const disiredPort = process.env.PORT ?? 3000;

const server = http.createServer((req, res) => {
	console.log('request received');
	res.end('Hola mundo');
});

findAvailablePort(disiredPort).then((port) => {
	server.listen(port, () => {
		console.log(`server listening on port http://localhost:${port}`);
	});
});