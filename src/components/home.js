import { Button, Container } from "react-bootstrap";
import React from "react";
import SearchForMovie from "./searchForMovie";
import SearchForTheater from "./searchForTheater";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();

  const routeChange = () => {
    let path = "/movies";
    history.push(path);
  };
  return (
    <>
      <Container style={{ width: "60%" }}>
        <h2 className="center">Movie Ratings API</h2>
        <br />
        <p className="center">Welcome to our movie ratings site.</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            className="button"
            style={{
              color: "black",
              backgroundColor: "#e3f2fd",
              borderColor: "#e3f2fd",
              marginBottom: "15px",
            }}
            onClick={routeChange}
          >
            View All Movies
          </Button>
        </div>
        <SearchForMovie></SearchForMovie>
        <SearchForTheater></SearchForTheater>
      </Container>
    </>
  );
}
