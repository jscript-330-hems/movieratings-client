import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

export default function Movie({ movie }) {
  const history = useHistory();

  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={movie.moviePicUrl} className="card-img" alt={movie.title} />
        </div>
        <div className="col-md-8">
          <Card.Body style={{ padding: "5px" }}>
            <Card.Title>{movie.title}</Card.Title>
            <ReactStars count={5} value={movie.averageScore} edit={false} />
            <Card.Text>
              <small className="text-muted">Rated: {movie.rating}</small>
            </Card.Text>
            <Button
              variant="primary"
              size="sm"
              onClick={() => history.push(`/moviedetail/${movie._id}`)}
            >
              See details
            </Button>
          </Card.Body>
        </div>
      </div>
    </div>
  );
}