import { useState, useEffect } from "react";
import MovieList from "./movieList";
import { Container } from "react-bootstrap";

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/movies`)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Container style={{ width: "60%" }}>
        <h1 className="center">Movies</h1>
        <p className="center">Below is a list of movies</p>
        <MovieList movies={movies}></MovieList>
      </Container>
    </>
  );
}
