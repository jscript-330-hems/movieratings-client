import { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import ReviewsList from "./reviewsList";
import ReactStars from "react-rating-stars-component";
import { AppContext } from "../context";
import { Table, Button } from "react-bootstrap";

export default function Movie() {
    const { id } = useParams();
    const history = useHistory();
    const { user } = useContext(AppContext);
  
    //https://www.npmjs.com/package/react-stars
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const [reviewsShown, setReviewsShown] = useState(false);
  
    useEffect(() => {
      fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/movies/${id}`)
        .then((res) => res.json())
        .then((data) => setMovie(data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, [id]);
  
    return (
      <div>
        {loading && <div>Still loading...</div>}
        {!loading && !movie && <div>Done loading but no movie. Hmm. Weird</div>}
        {!loading && movie && (
          <>
            <h1>{movie.title}</h1>
            <img alt={movie.title} src={movie.moviePicUrl} />
            <Table>
              <tbody>
                <tr>
                  <td>Rating</td>
                  <td>
                    <ReactStars
                      count={10}
                      value={movie.averageScore}
                      edit={false}
                    />{" "}
                    (avg {Math.round(movie.averageScore * 100) / 100} out of {movie.reviewCount} reviews)
                  </td>
                </tr>
                <tr>
                  <td>Actors</td>
                  <td>{movie.actors.join(", ")}</td>
                </tr>
                <tr>
                  <td>Release year</td>
                  <td>{movie.releaseYear}</td>
                </tr>
                <tr>
                  <td>Rating</td>
                  <td>{movie.rating}</td>
                </tr>
                <tr>
                  <td>Synopsis</td>
                  <td>{movie.synopsis}</td>
                </tr>
              </tbody>
            </Table>
            
            <Button onClick={() => history.push("/movies")}>
              Back to movie list
            </Button>
            &nbsp;
            <Button onClick={() => setReviewsShown(!reviewsShown)}>
              {reviewsShown && <span>Hide Reviews</span>}
              {!reviewsShown && <span>Show Reviews</span>}
            </Button>
            {user && (
              <>
              &nbsp;
              <Button onClick={() => history.push(`/writereview/${id}`)}>
                Write a review
              </Button>
              </>
            )}
            {reviewsShown && <ReviewsList movieId={id} />}
          </>
        )}
      </div>
    );
  }