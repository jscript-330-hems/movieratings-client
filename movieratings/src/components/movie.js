import Card from "react-bootstrap/card";
import Button from "react-bootstrap/button";
import ReactStars from "react-rating-stars-component";

export default function Movie({movie}) {
    return (
        <Card style={{ width: '15rem' }}>
            <Card.Img variant="top" src="https://www.joblo.com/wp-content/uploads/2021/03/tom-jerry-poster-1-400x600.jpg" /> 
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                    <ReactStars count={5} value={movie.rating} edit={false} />
                    Released: {movie.releaseYear}<br />
                    Rating: {movie.rating}<br />
                    Actors: {movie.actors}<br />
                </Card.Text>
                <Button variant="primary">See more</Button>
            </Card.Body>
        </Card>        
    )
}