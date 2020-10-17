import React from "react";
import fire from "../firebase";

const getCurrentUser = () => {
  fire.auth().onAuthStateChanged(function (user) {
    if (user) {
      console.log("This is the user: ", user.email);
      return user.email;
    } else {
      console.log("There is no logged in user");
      return null;
    }
  });
};

export default getCurrentUser;
