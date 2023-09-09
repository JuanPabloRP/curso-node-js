const express = require('express');
const crypto = require('node:crypto');
const cors = require('cors');

const movies = require('./movies.json');
const { validateSchema, validatePartialSchema } = require('./schemas/movies');

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: (origin, callback) => {
			const ACCEPTED_ORIGINS = [
				'http://localhost:8080',
				'http://localhost:1234',
			];

			if (ACCEPTED_ORIGINS.includes(origin)) {
				return callback(null, true);
			}

			if (!origin) {
				return callback(null, true);
			}

			return callback(new Error('Not allowed by CORS'));
		},
	})
);
app.disable('x-powered-by');

/* app.get('/', (req, res) => {
	res.json({ message: 'Hola mundo' });
});
 */

//todos los recursos que sean movies === /movies
app.get('/movies', (req, res) => {
	const { genre } = req.query;
	if (genre) {
		const filteredMovies = movies.filter((movie) =>
			movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
		);

		if (!filteredMovies || filteredMovies.length === 0) {
			return res
				.status(404)
				.json({ message: `Movies by ${genre} were not found` });
		}
		if (filteredMovies) {
			return res.json(filteredMovies);
		}
	}
	res.json(movies);
});

app.get('/movies/:id', (req, res) => {
	//path to regexp
	const { id } = req.params;
	const movie = movies.find((movie) => movie.id === id);
	if (movie) return res.json(movie);
	res.status(404).json({ message: 'Movie not found' });
});

app.post('/movies', (req, res) => {
	const result = validateSchema(req.body);

	if (result.error) {
		res.status(400).json({ error: JSON.parse(result.error.message) });
	}

	const newMovie = {
		id: crypto.randomUUID(), //uuidv4
		...result.data,
	};
	movies.push(newMovie);

	res.status(201).json(newMovie);
});

app.delete('/movies/:id', (req, res) => {
	const { id } = req.params;
	const movieIndex = movies.findIndex((movie) => movie.id === id);

	if (movieIndex === -1) {
		return res.status(404).json({ message: 'Movie not found' });
	}

	movies.splice(movieIndex, 1);

	return res.json({ message: 'Movie deleted' });
});

app.patch('/movies/:id', (req, res) => {
	const result = validatePartialSchema(req.body);

	if (!result.success) {
		return res.status(404).json({ error: JSON.parse(result.error.message) });
	}

	const { id } = req.params;
	const movieIndex = movies.findIndex((movie) => movie.id === id);

	if (movieIndex === -1) {
		return res.status(404).json({ message: 'Movie not found' });
	}

	const updateMovie = {
		...movies[movieIndex],
		...result.data,
	};

	movies[movieIndex] = updateMovie;

	return res.json(updateMovie);
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
	console.log(`server listening on port http://localhost:${PORT}`);
});