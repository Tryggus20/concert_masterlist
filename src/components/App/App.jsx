import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import CardView from "../CardView/CardView";
import ListView from "../ListView/ListView";
import LandingPage from "../LandingPage/LandingPage";
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

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
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
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

// useEffect(() => {
//   // API ACCESS TOKEN
//   const authParamaters = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     body:
//       "grant_type=client_credentials&client_id=" +
//       CLIENT_ID +
//       "&client_secret=" +
//       CLIENT_SECRET,
//   };
//   fetch("https://accounts.spotify.com/api/token")
//     .then((result) => result.json())
//     .then((data) => console.log("data:", data.access_token))
//     // the data will have the access token. useState on back end??
//     .catch((err) => {
//       console.log("error in getting token from Spotify", err);
//       res.sendStatus(500);
//     });
//   }, []);

//   // SEARCH: 
//   async function search() {
//     console.log("search for: ", searchInput); //would need button with searchInput stopped video at 20:44
//   }

// GET request using search to get artist ID then another GET request WITH artist ID
// to get the top songs/artist picture
// let artistParameters = {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer ' + accessToken
//   }
// }
// let artistId= await fetch('https://api.spotify.com/vi/search?q=' + searchInput + '&type=artist', artistParameters)
// .then(response => response.json()).then(data => console.log(data))

// in the .then data will need to look like this: .then(data => {return data.artists.items[0].id})
// console.log("artist id =", artistId);
// then will need to target the artist picture
