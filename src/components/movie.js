import { useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

export default function Movie({ movie }) {
  const history = useHistory();

  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row no-gutters">
        {/* <div style={{height:"300px"}}>
          <img src={movie.moviePicUrl} className="card-img" alt={movie.title} />
        </div> */}
        <div className="movieCard">
          <Card.Body style={{ padding: "0px" }}>
            <img
              style={{ height: "300px", width: "100%", objectFit: "cover" }}
              src={movie.moviePicUrl}
              className="card-img"
              alt={movie.title}
            />
            <div style={{ padding: "10px" }}>
              <Card.Title>{movie.title}</Card.Title>
              <ReactStars count={5} value={movie.averageScore} edit={false} />
              <Card.Text>
                <small className="text-muted">Rated: {movie.rating}</small>
              </Card.Text>
              <Button
                variant="primary"
                size="sm"
                onClick={() => history.push(`/moviedetail/${movie._id}`)}
                style={{
                  color: "black",
                  backgroundColor: "#e3f2fd",
                  borderColor: "#e3f2fd",
                }}
              >
                See details
              </Button>
            </div>
          </Card.Body>
        </div>
      </div>
    </div>
  );
}
