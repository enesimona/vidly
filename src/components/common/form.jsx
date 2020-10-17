import React from "react";
import Joi from "joi-browser";

const Form = () => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(
      data,
      schema,
      { abortEarly: false },
      options
    );
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;

    //old validation
    // const errors = {};
    // if (data.username.trim() === "")
    //   errors.username = "Username is required.";
    // if (data.password.trim() === "")
    //   errors.password = "Password is required.";
    // return Object.keys(errors).length === 0 ? null : errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemaN = { [name]: schema[name] };
    const { error } = Joi.validate(obj, schemaN);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors !== null ? errors : {});
    doSubmit();
  };

  const handleChange = (e) => {
    const errorsN = { ...errors };
    const errorMessage = validateProperty(e.target);
    if (errorMessage) errorsN[e.target.name] = errorMessage;
    else delete errorsN[e.target.name];

    var { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    setErrors(errorsN);
  };

  return <div></div>;
};

export default Form;
