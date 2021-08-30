import React from "react";
import Theater from "./theater";
import {Container, Row, Col} from "react-bootstrap";

export default function TheaterList({ theaters }) {
  return (
    <Container>
        <Row xs={1} md={2} lg={3} className="g-4">
          {theaters &&
            theaters.map((theater) => {
              return (
                <Col key={theater.name}>
                  <Theater theater={theater}></Theater>
                </Col>
              );
            })}
        </Row>
    </Container>
  );
}