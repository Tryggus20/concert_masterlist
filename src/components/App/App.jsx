import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import CardView from "../CardView/CardView";
import ListView from "../ListView/ListView";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import DetailView from "../DetailView/DetailView";
import ConcertForm from "../ConcertForm/ConcertForm";

import "./App.css";
import EditConcert from "../EditConcert/EditConcert";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <ListView />
          </Route>

    
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/users"
          >
            <CardView />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows List View else shows LoginPage
            exact
            path="/list"
          >
            <ListView />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows Detail View else shows LoginPage
            exact
            path="/details/:id"
          >
            <DetailView />
          </ProtectedRoute>
          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/users" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <ProtectedRoute
            // logged in shows Detail View else shows LoginPage
            exact
            path="/edit/:id"
          >
            <EditConcert />
          </ProtectedRoute>
          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/users" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <ProtectedRoute
            // logged in shows Concert Form else shows LoginPage
            exact
            path="/form"
          >
            <ConcertForm />
          </ProtectedRoute>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/users" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/users" />
            ) : (
              // Otherwise, show the Login page
              <LoginPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </Router>
  );
}

export default App;
