import React, { useEffect, useState } from "react";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import Input from "./common/input";
import Joi from "joi-browser";

const MovieForm = ({ match, history }) => {
  const [genres, setGenres] = useState([]);
  const [movie, setMovie] = useState({
    title: "",
    genreName: "",
    numberInStock: 0,
    dailyRentalRate: 0,
  });

  const [errors, setErrors] = useState({
    title: "",
    genreName: "",
    numberInStock: "",
    dailyRentalRate: "",
  });

  const schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreName: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
  };

  const type = "text";
  const movieId = match.params.id;

  useEffect(() => {
    const genres = getGenres();
    setGenres(genres);

    if (movieId === "new") return;

    const movie = getMovie(movieId);

    if (!movie) return history.replace("/not-found");

    setMovie(mapToViewModel(movie));
  }, []);

  const mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreName: movie.genre.name,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(movie, schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
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
    console.log("MOVIE " + movie);
    setErrors(errorsN);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors !== null ? errors : {});
    doSubmit();
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schemaN = { [name]: schema[name] };
    console.log("Schema n", schemaN);
    const { error } = Joi.validate(obj, schemaN);
    return error ? error.details[0].message : null;
  };

  const doSubmit = () => {
    saveMovie(movie);
    history.push("/movies");
  };

  return (
    <div>
      {/* <h1>Movie form {match.params.id}</h1> */}
      <h1>Movie form</h1>
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
            value={movie.genreName}
            name="genreName"
            label="Genre"
            onChange={handleChange}
            err={errors.genreId}
          >
            {genres.map((genre) => (
              <option>{genre.name}</option>
            ))}
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
          name="dailyRentalRate"
          value={movie.dailyRentalRate}
          label="Rate"
          onChange={handleChange}
          err={errors.dailyRentalRate}
        ></Input>
        <button disabled={validate()} className="btn btn-primary">
          {movieId === "new" ? "Add Movie" : "Edit Movie"}
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
