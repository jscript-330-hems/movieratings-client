import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Theater({ theater }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVICE_BASE_URL}/theaters/${theater._id}/movies`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((err) => console.error(err));
  }, [theater._id]);
  return (
    <div className="card mb-3 theaterCard" style={{ padding: "10px" }}>
      <div className="row no-gutters">
        <div>
          <Card.Body style={{ padding: "0px" }}>
            <img
              style={{ height: "100px", width: "100%", objectFit: "cover" }}
              src={theater.theaterPicUrl}
              className="card-img"
              alt={theater.theaterPicUrl}
            />
            <Card.Title>{theater.name}</Card.Title>
            <Card.Text>
              <small className="text-muted">
                <strong>Zipcode:</strong> {theater.zip}
              </small>
            </Card.Text>
            <small className="text-muted">
              <strong>Movies:</strong>
              <ul>
                {movies.map((m) => {
                  return (
                    <li key={m._id}>
                      <Link className="movieLink" to={`/moviedetail/${m._id}`}>
                        {m.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </small>
          </Card.Body>
        </div>
      </div>
    </div>
  );
}
