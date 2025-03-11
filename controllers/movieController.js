const connection = require('../data/db');

function index(req, res) {

    const sql = 'SELECT * FROM movies';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'DB KO' });
        res.json(results);
    });
};

function show(req, res) {

    const id = parseInt(req.params.id)

    const movieSql = 'SELECT * FROM movies WHERE id = ?';

    const reviewsSql = `
    SELECT *
    FROM reviews
    WHERE movie_id = ?
    `;

    connection.query(movieSql, [id], (err, movieResults) => {
        if (err) return res.status(500).json({ error: 'DB KO' });
        if (movieResults.length === 0) return res.status(404).json({ error: 'Movie not available' });

        const movie = movieResults[0];

        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ error: 'DB KO' });

            movie.reviews = reviewsResults;
            res.json(movie);

        });
    });

};

module.exports = { index, show };