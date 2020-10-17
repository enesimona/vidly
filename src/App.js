import React, { useState } from "react";
import "./App.css";
import { getMovies } from "./services/fakeMovieService";
import Pagination from "./components/common/pagination";
import { paginate } from "./components/utils/paginate";
import ListGroup from "./components/common/listGroup";
import { getGenres } from "./services/fakeGenreService";
import { useEffect } from "react";
import MoviesTable from "./components/moviesTable";
import _ from "lodash";
import Movies from "./components/movies";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import NewMovieForm from "./components/newMovieForm";
import Logout from "./components/Logout";
import ResetPassword from "./components/resetPassword";
import jwtDecode from "jwt-decode";
import ProtectedRoute from "./components/common/protectedRoute";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      //decode jwt
      const user = jwtDecode(jwt);
      setUser(user);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <NavBar user={user}></NavBar>
      <main className="container">
        <Switch>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/register" component={RegisterForm}></Route>
          <Route path="/logout" component={Logout}></Route>
          {/* <Route path="/movies/:id" component={MovieForm}></Route> */}
          <ProtectedRoute
            path="/movies/:id"
            component={MovieForm}
            user={user}
          ></ProtectedRoute>
          <Route
            path="/movies"
            render={(props) => <Movies {...props} user={user} />}
          ></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Route path="/password-reset" component={ResetPassword}></Route>
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
