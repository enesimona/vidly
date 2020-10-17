import React, { useState } from "react";
import { Link } from "react-router-dom";
import Input from "./common/input";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };
  const sendResetEmail = (event) => {
    event.preventDefault();
  };
  return (
    <div className="">
      <h1 className="">Reset your Password</h1>
      <div className="">
        <form action="">
          {emailHasBeenSent && (
            <div className="">An email has been sent to you!</div>
          )}
          {error !== null && <div className="">{error}</div>}

          <Input
            label="Email"
            type="email"
            name="userEmail"
            id="userEmail"
            value={email}
            placeholder="Add your email"
            onChange={onChangeHandler}
          />
          <button className="btn btn-primary">Send me a reset link</button>
        </form>
        <Link to="/login" className="">
          &larr; back to login page
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
