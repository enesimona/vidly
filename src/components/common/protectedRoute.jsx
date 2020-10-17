import { rest } from "lodash";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import getCurrentUser from "../../services/authService";

const ProtectedRoute = ({
  path,
  component: Component,
  render,
  user,
  isLoggedIn,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login", from: props.location }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
