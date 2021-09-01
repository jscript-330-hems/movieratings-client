import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";

export default function AddTheater() {
  const [theaters, setTheaters] = useState([]);
  const [theaterId, setTheaterId] = useState();
  const [name, setName] = useState();
  const [zip, setZip] = useState();
  const [movies, setMovies] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState(undefined);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/theaters`)
      .then((res) => res.json())
      .then((data) =>
        setTheaters(data.map(({ name, _id }) => ({ name: name, _id: _id })))
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

  async function addTheater(addedTheater) {
    return fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/theaters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getData("token")}`,
      },
      body: JSON.stringify(addedTheater),
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
    await addTheater({
      theaterId,
      name,
      movies,
      zip,
    });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Add a Theater</h1>
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <br />
        <form onSubmit={handleSubmit}>
          {error && error.length > 0 && <Alert variant="danger">{error}</Alert>}

          <table>
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
            Add Theater
          </Button>
        </form>
      </div>
      {status?.type === "success" && (
        <p
          style={{ textAlign: "center", marginTop: "15px", fontWeight: "bold" }}
        >
          Theater added!
        </p>
      )}
    </div>
  );
}
