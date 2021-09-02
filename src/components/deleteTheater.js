import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";

export default function DeleteTheater() {
  const [theaters, setTheaters] = useState([]);
  const [theaterId, setTheaterId] = useState();
  const [name, setName] = useState();
  const [zip, setZip] = useState();
  const [movies, setMovies] = useState();
  const [error, setError] = useState();
  const [status, setStatus] = useState(undefined);

  const { id } = useParams();
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

  async function deleteTheater(deletedTheater) {
    return fetch(
      `${process.env.REACT_APP_SERVICE_BASE_URL}/theaters/${theaterId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getData("token")}`,
        },
        body: JSON.stringify(deletedTheater),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await deleteTheater({
      theaterId,
      name,
      movies,
      zip,
    });
  };

  return (
    <>
      <div>
        <h3 style={{ textAlign: "center" }}>Delete a Theater</h3>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <br />
          <form onSubmit={handleSubmit}>
            {error && error.length > 0 && (
              <Alert variant="danger">{error}</Alert>
            )}

            <table>
              <tr>
                <td colspan="2">
                  <select
                    onChange={(e) => setTheaterId(e.target.value)}
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
              Delete Theater
            </Button>
          </form>
        </div>
        {status?.type === "success" && (
          <p
            style={{
              textAlign: "center",
              marginTop: "15px",
              fontWeight: "bold",
            }}
          >
            Theater deleted!
          </p>
        )}
      </div>
    </>
  );
}
