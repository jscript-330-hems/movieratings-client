//https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
import React, { useState, useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Form, Alert, FormGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppContext } from '../context';

export default function Login() {
  const { dispatchUserEvent } = useContext(AppContext);
  const [email, setEmail] = useState();
  const history = useHistory();
  const location = useLocation();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const { from } = location.state || { from: { pathname: "/" } };

  async function loginUser(credentials) {
    return fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => {
      if (data.status === 401) {
        setError("Invalid login");
      } else if (data.status !== 200) {
        setError("This error happened: " + data.statusText);
      } else {
        return data.json();
      }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password,
    });

    if (response != null) {
      dispatchUserEvent('LOGIN', response);
      history.replace(from);
    }
  };

  return (
    <>
      <h1>Log in</h1>
      <br />
      <Form onSubmit={handleSubmit}>
        {error && error.length > 0 && <Alert variant="danger">{error}</Alert>}

        <FormGroup>
          <Form.Label htmlFor="email">Email address</Form.Label>
          <Form.Control
            placeholder="Email address"
            type="email"
            name="email"
            class-name="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="form-text text-muted">
            Hint: You can use a fake email address
          </Form.Text>
        </FormGroup>
        <br />
        <FormGroup>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            placeholder="Password"
            type="password"
            name="password"
            class-name="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <br />
        <FormGroup>
          <Form.Text>
            Don't have an account? No problem.{" "}
            <Link to="/signup">Sign up.</Link>
          </Form.Text>
        </FormGroup>
        <br />
        <Button variant="primary" type="submit">
          Log in
        </Button>
      </Form>
    </>
  );
}
