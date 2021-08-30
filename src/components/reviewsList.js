import React from "react";
import { Container, Row, Col } from "react-bootstrap";
const { useEffect, useState } = require("react");

export default function ReviewsList({ movieId }) {

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/reviews/movie/${movieId}`)
        .then((res) => res.json())
        .then((data) => setReviews(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, [movieId]);  
  
    return (
      <>
      <h2>Movie Reviews</h2>
      <Container>
  
        {!loading && reviews && reviews.length > 0 && (
          reviews.map(r => (
            <Row key={reviews.indexOf(r)}>
              <Col sm={1}>
                <Container>
                  <Row>
                    <Col sm={6}>Rating:</Col>
                    <Col sm={6}><strong>{r.score}/10</strong></Col>
                  </Row>
                </Container>
              </Col>
              <Col sm={11}>{r.review}</Col>
              <hr />
            </Row>
          ))
        )}
      </Container>      
      </>
    );
  }