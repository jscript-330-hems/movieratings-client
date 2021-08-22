import Card from "react-bootstrap/card";
import Button from "react-bootstrap/button";
import ReactStars from "react-rating-stars-component";

export default function Movie({movie}) {
    return (
        
<div className="card mb-3" style={{maxWidth: "540px"}}>
  <div className="row no-gutters">
    <div className="col-md-4">
      <img src="https://www.joblo.com/wp-content/uploads/2021/03/tom-jerry-poster-1-400x600.jpg" className="card-img" alt={movie.title} />
    </div>
    <div className="col-md-8">
    
    <Card.Body style={{padding: "5px"}}>
        <Card.Title>{movie.title}</Card.Title>
        <ReactStars count={5} value={movie.averageScore} edit={false} />
        <Card.Text><small className="text-muted">Rated: {movie.rating}</small></Card.Text>
        <Button variant="primary" size="sm">See details</Button>
      </Card.Body>
    </div>
  </div>
</div>

    )
}