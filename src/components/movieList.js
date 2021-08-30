import React from "react";
import Movie from "./movie";
import {Container, Row, Col} from "react-bootstrap";

export default function Movies({ movies }) {
  return (
    <Container>
        <Row xs={1} md={2} lg={3} className="g-4">
          {movies &&
            movies.map((movie) => {
              return (
                <Col key={movie.title}>
                  <Movie movie={movie}></Movie>
                </Col>
              );
            })}
        </Row>
    </Container>
  );
}
