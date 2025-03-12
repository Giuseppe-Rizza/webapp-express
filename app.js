const express = require("express");
const app = express();
const port = process.env.PORT;

const moviesRouter = require('./routers/movieRouter');

const cors = require("cors");

app.use(express.static('public'));

app.use(imagePathMiddleware);

app.use(cors({ origin: process.env.FE_APP }));

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server Webapp movies")
});

app.use("/api/movies", moviesRouter);

app.listen(port, () => {
    console.log(`Port ${port}`)
});