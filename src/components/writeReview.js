import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";

export default function WriteReview() {
  const [movies, setMovies] = useState([]);
  const [movieId, setmovieId] = useState();
  const [score, setScore] = useState();
  const [review, setReview] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState(undefined);

  const { id } = useParams();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/movies`)
      .then((res) => res.json())
      .then((data) =>
        setMovies(data.map(({ title, _id }) => ({ title: title, _id: _id })))
      )
      .catch((err) => console.error(err));
  }, []);

  async function getData(key) {
    try {
      const value = sessionStorage.getItem(key);
      return value;
    } catch (e) {
      console.log(e);
    }
  }

  async function createReview(review) {
    return fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getData("token")}`,
      },
      body: JSON.stringify(review),
    })
      .then((data) => {
        if (data.status !== 200) {
          setError("This error happened: " + data.statusText);
        } else {
          return data.json();
        }
      })
      .then(() => setStatus({ type: "success" }))
      .catch((error) => setStatus({ type: "error", error }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createReview({
      movieId,
      review,
      score,
    });
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Write a Review</h1>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <br />
        <form onSubmit={handleSubmit}>
          {error && error.length > 0 && <Alert variant="danger">{error}</Alert>}

          <table>
            <tr>
              <td colspan="2">
                <select
                  onChange={(e) => setmovieId(e.target.value)}
                  style={{ marginBottom: "20px" }}
                >
                  <option value="" disabled selected>
                    Please select a movie
                  </option>
                  {movies.map((movie) => (
                    <option
                      key={movie._id}
                      value={movie._id}
                      selected={movie._id === id}
                    >
                      {movie.title}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label for="score">Movie Score:</label>
              </td>
              <td>
                {" "}
                <input
                  placeholder="Score"
                  type="number"
                  name="score"
                  onChange={(e) => setScore(e.target.value)}
                />
              </td>
            </tr>
            <br />
            <tr>
              <td>
                <label htmlFor="review">Review:</label>
              </td>
              <td>
                <textarea
                  placeholder="Review"
                  type="text"
                  name="review"
                  onChange={(e) => setReview(e.target.value)}
                />
              </td>
            </tr>
            <br />
          </table>
          <br />
          <Button
            variant="primary"
            type="submit"
            style={{
              color: "black",
              backgroundColor: "#e3f2fd",
              borderColor: "#e3f2fd",
            }}
          >
            Submit Review
          </Button>
        </form>
      </div>
      {status?.type === "success" && (
        <p
          style={{ textAlign: "center", marginTop: "15px", fontWeight: "bold" }}
        >
          Review submitted!
        </p>
      )}
    </>
  );
}
