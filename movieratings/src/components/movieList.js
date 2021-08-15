import React from 'react';
import Movie from './movie';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/row";
import Col from "react-bootstrap/col";

export default function Movies({movies}) {

    return (
        <Container>
            <Row>
            {
            movies && movies.map(movie => {
                return (<Col key={movie.title}><Movie movie={movie}></Movie></Col>)
            })
            }
            </Row>
        </Container>
    )
}