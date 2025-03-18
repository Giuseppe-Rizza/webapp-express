const connection = require('../data/db');

function index(req, res) {

    const sql = 'SELECT * FROM movies';

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'DB KO' });

        const movies = results.map(movie => {

            return {
                ...movie,
                image: req.imagePath + movie.image
            }

        })
        res.json(movies);
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

        movie.image = req.imagePath + movie.image;

        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ error: 'DB KO' });

            movie.reviews = reviewsResults;
            res.json(movie);

        });
    });

};

function store(req, res, next) {

    const { title, director, genre, release_year, abstract } = req.body;

    const imageName = `${req.file.filename}`;

    const query = "INSERT INTO movies (title, director, genre, release_year, image, abstract) VALUES (?, ?, ?, ?, ?, ?)";

    connection.query(query,
        [title, director, genre, release_year, imageName, abstract],
        (err, result) => {
            if (err) {
                console.log(err)
                return next(new Error("DB KO"));
            }

            res.status(201).json({
                status: "success",
                message: "New movie added",
            });
        })
}

function storeReview(req, res) {

    const { id } = req.params;

    const { text, name, vote } = req.body;

    const insertReviewSql = 'INSERT INTO reviews (text, name, vote, movie_id) VALUES (?, ?, ?, ?)'

    connection.query(insertReviewSql, [text, name, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'DB KO' });
        res.status(201);
        res.json({ message: 'New Review', id: results.insertId });

    });

};

module.exports = { index, show, store, storeReview };