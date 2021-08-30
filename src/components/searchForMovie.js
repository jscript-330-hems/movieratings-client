import React, { useState } from "react";
import { Button, Form, FormGroup, Alert } from "react-bootstrap";
import MovieList from "./movieList";

export default function SearchForMovie() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  async function searchForMovie(query) {
    setLoading(true);
    return fetch(
      `${process.env.REACT_APP_SERVICE_BASE_URL}/movies/search?query=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((data) => {
        setHasSearched(true);
      setLoading(false);
      if (data.status !== 200) {
        setError("This error happened: " + data.statusText);
      } else {
        return data.json();
      }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await searchForMovie(search);
    console.log(response);
    setMovies(response);
  };


  return (
    <>
      <h3>Search for a movie</h3>
      <Form onSubmit={handleSubmit}>
        {error && error.length > 0 && <Alert variant="danger">{error}</Alert>}

        <FormGroup>
          <Form.Label htmlFor="query">Search</Form.Label>
          <Form.Control
            placeholder="Enter a search term"
            type="text"
            name="query"
            class-name="form-control"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Form.Text className="form-text text-muted">
            You can search for a movie title, genre or synoposis
          </Form.Text>
        </FormGroup>
        <br />

        <Button 
            style={{color: "black", backgroundColor: "#e3f2fd", borderColor: "#e3f2fd", marginBottom: "15px"}}
          variant="primary" 
          type="submit"
        >
          Search
        </Button>
      </Form>
      {movies.length > 0 && !loading && (
          <MovieList movies={movies}></MovieList>
      )}
      {movies.length === 0 && !loading && hasSearched && (<div>No movies found.</div>)}
    </>
  );
}


