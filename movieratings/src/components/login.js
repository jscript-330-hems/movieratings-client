//https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useHistory, useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { FormGroup } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState();
  const { setToken, setRoles } = useAuth();
  const history = useHistory();
  const location = useLocation();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const { from } = location.state || { from: { pathname: "/" } };

  async function loginUser(credentials) {
    return fetch("http://localhost:5000/login", {
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
      setToken(response.token);
      setRoles(response.roles);
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
          <Form.Label for="email">Email address</Form.Label>
          <Form.Control
            placeholder="Email address"
            type="email"
            name="email"
            class-name="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text class="form-text text-muted">
            Hint: You can use a fake email address
          </Form.Text>
        </FormGroup>
        <br />
        <FormGroup>
          <Form.Label for="password">Password</Form.Label>
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
