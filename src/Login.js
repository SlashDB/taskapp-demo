import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";

import { useSetUp, auth } from '@slashdb/react-slashdb';

export default function Login(props) {

  const [username, setUsername] = useState(
    process.env.REACT_APP_DATABASE_USERNAME
  );
  const [password, setPassword] = useState(
    process.env.REACT_APP_DATABASE_PASSWORD
  );

  let history = useHistory();

  function validateForm() {
    return username.length > 0;
  }

  const sdbClient = useSetUp();
  const handleSubmit = (event) => {
    auth.login(sdbClient, () => {
      history.push('/app');
    });
    event.preventDefault();
  };

  const loginStyle = {
    paddingTop: '100px',
    margin: 'auto',
    width: '170px',
  };

  const buttonWrapper = {
    marginTop: '7px',
    height: '20px',
    float: 'right',
    backgroundColor: '#00afef',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
    cursor: 'pointer',
    outline: 'none',
  };

  return (
    <div className="Login" style={loginStyle}>
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          style={buttonWrapper}
          size="lg"
          type="submit"
          disabled={!validateForm()}
        >
          Login
        </Button>
      </Form>
    </div>
  );
}
