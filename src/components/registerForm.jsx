import React, { useState } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import fire from "../firebase";
import { useEffect } from "react";

const RegisterForm = (props) => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
    // name: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    // name: "" ,
  });
  const schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().min(5).max(15).required(),
    // name: Joi.string().required().label("Name"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(account, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      //item.path[0] trebuie sa fie email sau password
      if (item.path[0] === "email" || item.path[0] === "password") {
        errors[item.path[0]] = item.message;
        return errors;
      } else {
        return null;
      }
    }

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
    console.log("Handle Submit");
    const errors = validate();
    setErrors({ errors: errors || {} });
    if (errors) return;
    doSubmit();
  };

  const doSubmit = () => {
    //call the server
    fire
      .auth()
      .createUserWithEmailAndPassword(account.email, account.password)
      .then(() => {
        console.log("Register OK");
        fire
          .auth()
          .currentUser.getIdToken(true)
          .then(function (idToken) {
            console.log(idToken);
            localStorage.setItem("token", idToken);
            // props.history.push("/");
            window.location = "/";
          })
          .catch(function (error) {
            //Handle error
          });
      })
      .catch((error) => {
        console.log("Error register ");
        switch (error.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            // setErrors(error.message);
            setErrors({ email: error.message });
            // alert(error.message);
            break;
          case "auth/weak-password":
            setErrors(error.message);
            // alert(error.message);
            break;
        }
      });
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (account) {
        setAccount(user);
      } else {
        setAccount({});
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

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
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          // value={account.email}
          label="Email"
          onChange={handleChange}
          err={errors.email}
        ></Input>
        <Input
          type="password"
          name="password"
          // value={account.password}
          label="Password"
          onChange={handleChange}
          err={errors.password}
        ></Input>
        {/* <Input
          type="text"
          name="name"
          value={account.name}
          label="Name"
          onChange={handleChange}
          err={errors.name}
        ></Input> */}
        <button disabled={validate()} className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );

  async function onRegister() {
    try {
      // await firebase.register(account.password, account.email, account.name);
    } catch (error) {
      alert(error.message);
    }
  }
};

export default RegisterForm;
