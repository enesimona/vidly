import React from "react";
import Movie from "../components/movie";
import { useState } from "react";
import TableHeader from "./common/tableheader";
import Like from "./common/like";
import TableBody from "./common/tableBody";
import Table from "./common/table";
import { Link } from "react-router-dom";

const MoviesTable = (props) => {
  const { movies, onSort, sortColumn } = props;
  const columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => props.onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      data={movies}
      sortColumn={sortColumn}
      onSort={onSort}
    ></Table>
  );
};

export default MoviesTable;
