import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MovieList from './movieList';

export default function Movies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        //fetch("https://desolate-dawn-22773.herokuapp.com/movies") // won't work until the service includes CORS
        fetch("http://localhost:5000/movies")
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