import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const { useEffect, useState } = require("react");

export default function MovieListForTheater({ movieId }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/movies/${movieId}`)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [movieId]);

  return (
    <>
      <p>Movies</p>
      <Container>
        {movies.map((movie) => (
          <Row key={movies.indexOf(movie)}>
            <Col sm={11}>{movie.title}</Col>
            <hr />
          </Row>
        ))}
      </Container>
    </>
  );
}
