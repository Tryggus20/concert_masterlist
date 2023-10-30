import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AboutPage from '../AboutPage/AboutPage';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Container, Row, Col, Button} from 'react-bootstrap'


function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Form className="formPanel register" onSubmit={registerUser}>
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <Form.Label htmlFor="username">
          Username:
          <Form.Control
            type="text"
            name="username"
            value={username}
            required
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
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Label>
      </div>
      <div>
        <input className="button" type="submit" name="submit" value="Register" />
      </div>
    </Form>
  );
}

export default RegisterForm;
