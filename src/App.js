import "./App.css";
import Login from "./components/login";
import Home from "./components/home";
import SignUp from "./components/signup";
import WriteReview from "./components/writeReview";
import { HashRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/privateRoute";
import AdminArea from "./components/adminArea";
import NotAnAdmin from "./components/notAnAdmin";
import Movies from "./components/movies";
import MovieDetail from "./components/movieDetail";
import Menu from "./components/menu";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { AppContext } from './context';

function App() {
  const [user, setUser] = useState(null);

  const dispatchUserEvent = (actionType, payload) => {
    switch (actionType) {
      case 'LOGIN':
        setUser(payload);
        sessionStorage.setItem("token", payload.token);
        return;
      case 'LOGOUT':
        setUser(null);
        sessionStorage.clear();
        return;
      default:
        return;
    }
  }

  return (
    <AppContext.Provider value={{ user, dispatchUserEvent }}>
      <Router>
        <Container>
          <Row>
            <Col sm={2}>
              <Menu></Menu>
            </Col>
            <Col sm={10}>
              <Route path="/" exact={true} component={Home} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/notanadmin" component={NotAnAdmin} />
              <Route path="/movies" component={Movies} />
              <Route path="/moviedetail/:id" component={MovieDetail} />
              <PrivateRoute path="/writereview">
                <WriteReview />
              </PrivateRoute>
              <PrivateRoute requiresAdmin={true} path="/adminarea">
                <AdminArea />
              </PrivateRoute>
            </Col>
          </Row>
        </Container>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
