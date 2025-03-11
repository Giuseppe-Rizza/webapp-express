const express = require("express");
const app = express();
const port = 3000;

const moviesRouter = require('./routers/movieRouter');

app.use(express.static('public'));

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server Webapp movies")
});

app.use("/api/movies", moviesRouter);

app.listen(port, () => {
    console.log(`Port ${port}`)
});