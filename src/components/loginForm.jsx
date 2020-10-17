import React, { useState } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import fire from "../firebase";
import { Link } from "react-router-dom";

const LoginForm = (props) => {
  const [account, setAccount] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const type = "text";

  const schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(account, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;

    //old validation
    // const errors = {};
    // if (account.username.trim() === "")
    //   errors.username = "Username is required.";
    // if (account.password.trim() === "")
    //   errors.password = "Password is required.";
    // return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors !== null ? errors : {});
    doSubmit();
  };

  const doSubmit = async () => {
    //call the server

    fire
      .auth()
      .signInWithEmailAndPassword(account.email, account.password)
      .then(() => {
        console.log("Login OK");
        fire
          .auth()
          .currentUser.getIdToken(true)
          .then(function (idToken) {
            localStorage.setItem("token", idToken);
            // props.history.push("/");
            const location = props.location;
            window.location =
              location.from && location.from.pathname
                ? location.from.pathname
                : "/";
          })
          .catch(function (error) {
            //Handle error
          });
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setErrors({ email: error.message });
            break;
          case "auth/wrong-password":
            setErrors({ password: error.message });
            break;
        }
      });
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemaN = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemaN);
    return error ? error.details[0].message : null;
  };

  const handleChange = (e) => {
    const errorsN = { ...errors };
    const errorMessage = validateProperty(e.target);
    if (errorMessage) errorsN[e.target.name] = errorMessage;
    else delete errorsN[e.target.name];

    var { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
    setErrors(errorsN);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type={type}
          name="email"
          value={account.email}
          label="Email"
          onChange={handleChange}
          err={errors.email}
        ></Input>
        <Input
          type="password"
          name="password"
          value={account.password}
          label="Password"
          onChange={handleChange}
          err={errors.password}
        ></Input>
        <button disabled={validate()} className="btn btn-primary">
          Login
        </button>
      </form>
      <p className="text-center my-3">
        Don't have an account?{" "}
        <Link to="register" className="text-blue-500 hover:text-blue-600">
          Register here
        </Link>{" "}
        <br />{" "}
        <Link to="password-reset" className="text-blue-500 hover:text-blue-600">
          Forgot Password?
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
