import React from "react";
import { useState } from "react";
import Input from "./common/input";
import Joi from "joi-browser";
import Movies from "./movies";
import { saveMovie } from "../services/fakeMovieService";

const NewMovieForm = (props) => {
  const [movie, setMovie] = useState({
    title: "",
    genreId: "",
    numberInStock: 0,
    rate: 0,
  });
  const [errors, setErrors] = useState({
    title: "",
    genre: "",
    numberInStock: "",
    rate: "",
  });
  const type = "text";

  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Numer in Stock"),
    rate: Joi.number().required().min(0).max(10).label("Rate"),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(movie, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors !== null ? errors : {});
    doSubmit();
    props.history.push("/movies");
  };

  const doSubmit = () => {
    //call the server
    saveMovie(movie);
    console.log("Submitted");
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
    setMovie({
      ...movie,
      [name]: value,
    });
    setErrors(errorsN);
  };

  return (
    <div>
      <h1>Movie Form</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type={type}
          name="title"
          value={movie.title}
          label="Title"
          onChange={handleChange}
          err={errors.title}
        ></Input>

        <div className="form-group">
          <label>Genre</label>
          <select
            className="form-control"
            value={movie.genre}
            name="genre"
            label="Genre"
            onChange={handleChange}
          >
            <option>Comedy</option>
            <option>Action</option>
            <option>Thriller</option>
          </select>
        </div>

        <Input
          type="number"
          name="numberInStock"
          value={movie.numberInStock}
          label="Number in Stock"
          onChange={handleChange}
          err={errors.numberInStock}
        ></Input>

        <Input
          type="number"
          name="rate"
          value={movie.rate}
          label="Rate"
          onChange={handleChange}
          err={errors.rate}
        ></Input>
        <button disabled={validate()} className="btn btn-primary">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default NewMovieForm;
