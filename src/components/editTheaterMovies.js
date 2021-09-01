import React, { useEffect, useState } from "react";

// Goal: Display the list of movies showing at the
// theater selected in the dropdown menu on the admin page
export default function EditTheaterMovies({ theater }) {
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
          <strong>Movies:</strong>
          <ul>
            {movies.map((m) => {
              return (
                <li key={m._id}>
                  <div>{m.title}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
