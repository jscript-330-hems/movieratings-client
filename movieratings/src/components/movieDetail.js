import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Table from "react-bootstrap/Table";

export default function Movie() {

  const { id } = useParams();

  //https://www.npmjs.com/package/react-stars
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/movies/${id}`)
        .then(res => res.json())
        .then(data => setMovie(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
}, [id]);

    return (
        <div>
          {loading && <div>Still loading...</div>}
          {!loading && !movie && <div>Done loading but no movie.  Hmm.  Weird</div>}
          {!loading && movie && (
            <>
            <h1>{movie.title}</h1>
            <img alt={movie.title} src={movie.moviePicUrl} />
            <Table>
              <tbody>
                <tr>
                  <td>Rating</td>
                  <td><ReactStars count={10} value={movie.averageScore} edit={false} /> (avg {movie.averageScore} out of {movie.reviewCount} reviews)</td>
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
            </>
          )}
        </div>

    )
}