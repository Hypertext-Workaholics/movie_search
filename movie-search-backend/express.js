const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5001;
const OMDB_API_KEY = '9fb55dc4'; 

app.use(cors());


app.get('/api/movies', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    try {
        const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${OMDB_API_KEY}`);
        if (response.data.Response === 'False') {
            return res.status(404).json({ error: response.data.Error });
        }
        res.json(response.data.Search);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movie data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});