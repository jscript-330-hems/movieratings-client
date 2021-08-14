import './App.css';
import Login from './components/login';
import Home from './components/home';
import SignUp from './components/signup';
import WriteReview from './components/writeReview';
import { HashRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import AdminArea from './components/adminArea';
import NotAnAdmin from './components/notAnAdmin';
import Movies from './components/movies';
import Menu from './components/menu';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
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
              <PrivateRoute path="/writereview"><WriteReview /></PrivateRoute>
              <PrivateRoute requiresAdmin={true} path="/adminarea"><AdminArea /></PrivateRoute>
            
          </Col>
        </Row>
      </Container>
      </Router>
  );
}

export default App;
