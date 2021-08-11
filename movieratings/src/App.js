import './App.css';
import Login from './components/login';
import Home from './components/home';
import SignUp from './components/signup';
import WriteReview from './components/writeReview';
import { HashRouter as Router, Route } from 'react-router-dom';
import PrivateRoute from './components/privateRoute';
import AdminArea from './components/adminArea';
import NotAnAdmin from './components/notAnAdmin';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/notanadmin" component={NotAnAdmin} />
        <PrivateRoute path="/writereview"><WriteReview /></PrivateRoute>
        <PrivateRoute requiresAdmin={true} path="/adminarea"><AdminArea /></PrivateRoute>
      </Router>
    </div>
  );
}

export default App;
