const z = require('zod');

const movieSchema = z.object({
	title: z.string({
		invalid_type_error: 'Movie title must be a string',
		required_error: 'Movie title es required',
	}),
	genre: z.array(
		z.enum([
			'Action',
			'Adventure',
			'Comedy',
			'Drama',
			'Fantasy',
			'Horror',
			'Thriller',
			'Sci-Fi',
			'Crime',
		])
	),
	year: z.number().int().min(1900).max(2024),
	duration: z.number().int().positive(),
	director: z.string(),
	poster: z.string().url({
		message: 'Poster must be a valid URL',
	}),
	rate: z.number().min(0).max(10).default(5),
});

function validateSchema(object) {
	return movieSchema.safeParse(object);
}

function validatePartialSchema(object) {
	return movieSchema.partial().safeParse(object);
}

module.exports = {
	validateSchema,
	validatePartialSchema,
};
