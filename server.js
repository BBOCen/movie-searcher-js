import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

//Get the current file path and directory path for serving static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
//Enable CORS to allow requests from different origins
app.use(cors());
//Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;

//Route to serve the index.html file when visiting the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//API route to fetch movie trailer videos by movie ID
app.get('/movie/:movie_id/videos', async (req, res) => {
    const movie_id = req.params.movie_id;
    const url = `https://api.themoviedb.org/3/movie/${movie_id}/videos`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        //Return the movie video data
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch trailer videos' });
    }
});

//API route to search for movies by query
app.get('/search', async (req, res) => {
    const query = req.query.query;
    const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        //Return the search results data
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch search results' });
    }
});

//Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
