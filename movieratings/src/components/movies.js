import { useState, useEffect } from 'react';
import MovieList from './movieList';

export default function Movies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/movies`)
            .then(res => res.json())
            .then(data => setMovies(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <>
        <h1>Movies</h1>
        <p>Below is a list of movies</p>
        <MovieList movies={movies}></MovieList>
        </>
    )
}