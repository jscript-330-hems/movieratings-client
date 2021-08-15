import React from 'react';
import Movie from './movie';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/row";
import Col from "react-bootstrap/col";
import CardGroup from "react-bootstrap/cardgroup";

export default function Movies({movies}) {

    return (
        <Container>
            <CardGroup>
            <Row xs={1} md={2} lg={3} className="g-4">
            {
            movies && movies.map(movie => {
                return (<Col key={movie.title}><Movie movie={movie}></Movie></Col>)
            })
            }
            </Row>
            </CardGroup>
        </Container>
    )
}