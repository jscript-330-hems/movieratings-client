import React from "react";
import { Container } from "react-bootstrap";
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
      <h2 style={{ marginTop: "20px" }}>Movie Reviews</h2>
      <Container>
        {!loading &&
          reviews &&
          reviews.length > 0 &&
          reviews.map((r) => (
            <div>
              <div key={reviews.indexOf(r)} className="reviewContainer">
                <div sm={1}>
                  <div className="ratingContainer">
                    <div sm={6}>Rating:</div>
                    <div sm={6}>
                      <strong>{r.score}/10</strong>
                    </div>
                  </div>
                </div>
                <div sm={11}>{r.review}</div>
              </div>
              <hr style={{ width: "100%" }} />
            </div>
          ))}
      </Container>
    </>
  );
}
