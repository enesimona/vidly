import React from "react";
import { Link } from "react-router-dom";
import fire from "../firebase";

const Logout = (props) => {
  fire
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      localStorage.removeItem("token");
      window.location = "/";
    })
    .catch(function (error) {
      // An error happened.
      console.log(error);
    });
  return <div></div>;
};

export default Logout;
