import React, { useState } from "react";

const Input = ({ name, label, err, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        id="username"
        name={name}
        className="form-control"
        // type={type}
        // value={value}
        // onChange={onChange}
      ></input>
      {err && <div className="alert alert-danger">{err}</div>}
    </div>
  );
};

export default Input;
