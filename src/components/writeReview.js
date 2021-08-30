import React, { useEffect, useState } from "react";

import { Button, Alert } from "react-bootstrap";

export default function WriteReview() {
  const [movies, setMovies] = useState([]);
  const [movieId, setmovieId] = useState();
  const [score, setScore] = useState();
  const [review, setReview] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/movies`)
      .then((res) => res.json())
      .then((data) => setMovies(data.map(({ title, _id }) => ({ title: title, _id: _id }))))
      .catch((err) => console.error(err));
  }, []);

  async function getData(key)  {
    try {
      const value = sessionStorage.getItem(key);
      return value;
    } catch (e) {
      console.log(e);
    }
  };

  async function createReview(review) {
    return fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${await getData('token')}`,
      },
      body: JSON.stringify(review),
    }).then((data) => {
      if (data.status !== 200) {
        setError("This error happened: " + data.statusText);
      } else {
        return data.json();
      }
    });
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
      <form onSubmit={handleSubmit}>
        {error && error.length > 0 && <Alert variant="danger">{error}</Alert>}
        <select onChange={(e) => setmovieId(e.target.value)}>
          <option value="" disabled selected>Please select a movie</option>
          {movies.map((movie) => (
            <option
              key={movie._id}
              value={movie._id}
            >
              {movie.title}
            </option>
          ))}
        </select>
        <br />
        <label for="score">Movie Score</label>
        <input
          placeholder="Score"
          type="number"
          name="score"
          onChange={(e) => setScore(e.target.value)}
        />
        <br />
        <label htmlFor="review">Review</label>
        <input
          placeholder="Review"
          type="text"
          name="review"
          onChange={(e) => setReview(e.target.value)}
        />
        <br />
        <Button variant="primary" type="submit">
          Submit Review
        </Button>
      </form>
    </>
  );
}
