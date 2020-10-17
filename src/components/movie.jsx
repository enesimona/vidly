import React from "react";
import Like from "./common/like";

const Movie = (props) => {
  return (
    <tr>
      <th scope="row">{props.title}</th>
      <td>{props.genre}</td>
      <td>{props.stock}</td>
      <td>{props.rate}</td>
      <td>
        <Like liked={props.liked} onClick={props.handleLike} />
      </td>
      <td>
        <button
          type="button"
          className="btn btn-danger"
          onClick={props.handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Movie;
