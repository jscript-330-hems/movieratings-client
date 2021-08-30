import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import MovieListForTheater from "./movieListForTheater";
import { useParams } from "react-router-dom";

export default function Theater({ theater }) {
  const [movie, setMovie] = useState([]);
  const { id } = useParams();

  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/theaters/${id}/movies`)
      .then((res) => res.json())
      .then((data) => setMovie(data.map(({ title, _id }) => ({ title: title, _id: _id }))))
      .then()
      .catch((err) => console.error(err));
  }, [id]);

  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row no-gutters">
        <div className="col-md-8">
          <Card.Body style={{ padding: "5px" }}>
            <Card.Title>{theater.name}</Card.Title>
            <Card.Text>
              <small className="text-muted">Zipcode: {theater.zip}</small>
            </Card.Text>
            <Card.Text>
              <small className="text-muted">Movies: {theater.movies} </small>
            </Card.Text>
          </Card.Body>
          <MovieListForTheater movieId={id} />
        </div>
      </div>
    </div>
  );
}