import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const searchMovies = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(`http://localhost:5001/api/movies?query=${searchQuery}`);
            setMovies(response.data);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app">
            <h1>Movie Search</h1>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for a movie..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={searchMovies}>Search</button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <div className="movie-list">
                {movies.map((movie) => (
                    <div key={movie.imdbID} className="movie-card">
                        <img src={movie.Poster} alt={movie.Title} />
                        <div className="movie-details">
                            <h3>{movie.Title}</h3>
                            <p>Year: {movie.Year}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;