const http = require('node:http'); // protocolo HTTP
const fs = require('node:fs');

const disiredPort = process.env.PORT ?? 1234;

const processRequest = (req, res) => {
	res.setHeader('Content-Type', 'text/html; charset=utf-8');

	if (req.url === '/') {
		res.end('Bienvenido a mi página de inicio');
	} else if (req.url === '/imagen.jpg') {
		fs.readFile('./holupbroda.jpg', (err, data) => {
			if (err) {
				res.statusCode = 500;
				res.end('<h1>500 Internal Server Error</h1>');
			} else {
				res.setHeader('Content-Type', 'image/jpg');
				res.end(data);
			}
		});
	} else if (req.url === '/contacto') {
		res.end('<h1>Contacto</h1>');
	} else {
		res.statusCode = 404; // Not Found
		res.end('<h1>Error 404</h1>');
	}
};

const server = http.createServer(processRequest);

server.listen(disiredPort, () => {
	console.log(`server listening on port http://localhost:${disiredPort}`);
});
