import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";

import { Button, Form, FormGroup, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [email, setEmail] = useState();
  const history = useHistory();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  async function createUser(credentials) {
    return fetch(`${process.env.REACT_APP_SERVICE_BASE_URL}/login/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((data) => {
      if (data.status !== 200) {
        setError("This error happened: " + data.statusText);
      } else {
        return data.json();
      }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createUser({
      email,
      password,
    });

    if (response != null) {
      history.replace("/login");
    }
  };

  return (
    <>
      <Container style={{ width: "40%" }}>
        <h1>Sign up</h1>
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
              Already have an account? <Link to="/login">Sign in.</Link>
            </Form.Text>
          </FormGroup>
          <br />

          <Button
            variant="primary"
            type="submit"
            style={{
              color: "black",
              backgroundColor: "#e3f2fd",
              borderColor: "#e3f2fd",
              marginBottom: "15px",
            }}
          >
            Sign up
          </Button>
        </Form>
      </Container>
    </>
  );
}
