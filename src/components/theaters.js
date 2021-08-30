import { useState, useEffect } from "react";
import TheaterList from "./theaterList";
import { Container } from "react-bootstrap";

export default function Theaters() {
  const [theaters, setTheaters] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/theaters`)
      .then((res) => res.json())
      .then((data) => setTheaters(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Container style={{width:"60%"}}>
        <h1>Theaters</h1>
        <p>Below is a list of theaters</p>
        <TheaterList theaters={theaters}></TheaterList>
      </Container>
    </>
  );
}