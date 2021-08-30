import { Button, Container } from 'react-bootstrap';
import React from 'react';
import SearchForMovie from './searchForMovie';
import SearchForTheater from './searchForTheater';
import { useHistory } from "react-router-dom";

export default function Home() {
    const history = useHistory();

    const routeChange = () =>{ 
        let path = "/movies"; 
        history.push(path);
    }
    return (
        <>
        <Container style={{width:"60%"}}>
            <h2>Movie Ratings API</h2>
            <br />
            <p>Welcome to our movie ratings site.</p>
            
            <Button 
                className="button"
                style={{color: "black", backgroundColor: "#e3f2fd", borderColor: "#e3f2fd"}}
                onClick={routeChange}
            >
                    View All Movies
            </Button>
            <SearchForMovie></SearchForMovie>
            <SearchForTheater></SearchForTheater>
        </Container>
        </>
    )
}