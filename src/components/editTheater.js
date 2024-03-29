import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";

export default function EditTheater() {
  const [theaters, setTheaters] = useState([]);
  const [theaterId, setTheaterId] = useState();
  const [name, setName] = useState();
  const [zip, setZip] = useState();
  const [movies, setMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [error, setError] = useState();
  const [status, setStatus] = useState(undefined);
  let index;

  const { id } = useParams();
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/theaters`)
      .then((res) => res.json())
      .then((data) =>
        setTheaters(data.map(({ name, _id }) => ({ name: name, _id: _id })))
      )
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/movies`)
      .then((res) => res.json())
      .then((data) => {
        setDisplayedMovies(data);
      })
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

  async function updateTheater(updatedTheater) {
    return fetch(
      `${process.env.REACT_APP_SERVICE_BASE_URL}/theaters/${theaterId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getData("token")}`,
        },
        body: JSON.stringify(updatedTheater),
      }
    )
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

  const handleChange = async (e) => {
    e.preventDefault();
    setTheaterId(e.target.value);
  };

  const handleChecked = (e) => {
    const { checked, value } = e.currentTarget;

    setMovies((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTheater({
      theaterId,
      name,
      movies,
      zip,
    });
  };

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Edit a Theater</h3>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <br />
        <form onSubmit={handleSubmit}>
          {error && error.length > 0 && <Alert variant="danger">{error}</Alert>}

          <table>
            <tr>
              <td colspan="2">
                <select
                  onChange={handleChange}
                  style={{ marginBottom: "20px" }}
                >
                  <option value="" disabled selected>
                    Please select a theater
                  </option>
                  {theaters.map((theater) => (
                    <option
                      key={theater._id}
                      value={theater._id}
                      selected={theater._id === id}
                    >
                      {theater.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <div style={{ marginRight: "-140px" }}>
                <p>Movies:</p>
                <div>
                  {displayedMovies.map((movie) => {
                    return (
                      <div>
                        <input
                          type="checkbox"
                          id={movie._id}
                          name={movie.title}
                          value={movie._id}
                          onChange={handleChecked}
                        />
                        <label for={movie._id}>{movie.title}</label>
                      </div>
                    );
                  })}
                </div>
                <br />
              </div>
            </tr>
            <tr>
              <td>
                <label for="name">Theater Name:</label>
              </td>
              <td>
                {" "}
                <input
                  placeholder="Name"
                  type="text"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </td>
            </tr>
            <br />
            <tr>
              <td>
                <label htmlFor="zip">Zip Code:</label>
              </td>
              <td>
                <input
                  placeholder="12345"
                  type="number"
                  name="zipCode"
                  onChange={(e) => setZip(e.target.value)}
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
            Update Theater
          </Button>
        </form>
      </div>
      {status?.type === "success" && (
        <p
          style={{ textAlign: "center", marginTop: "15px", fontWeight: "bold" }}
        >
          Theater updated!
        </p>
      )}
    </div>
  );
}
