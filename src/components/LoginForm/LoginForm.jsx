import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Container, Row, Col, Button} from 'react-bootstrap'


function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Form className="formPanel login" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div>
        <Form.Label htmlFor="username">
          Username:
          <Form.Control
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Label>
      </div>
      <div>
        <Form.Label htmlFor="password">
          Password:
          <Form.Control
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Label>
      </div>
      <div>
        <input className="button" type="submit" name="submit" value="Log In" />
      </div>
    </Form>
  );
}

export default LoginForm;
