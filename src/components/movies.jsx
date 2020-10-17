import React, { useState } from "react";
import "../App.css";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import { useEffect } from "react";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";

const Movies = (props) => {
  const [movies, setMovies] = useState([]); //useEffect
  const [pageSize, setSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortColumn, setSortColumn] = useState({ path: "title", order: "asc" });
  const [query, setQuery] = useState("");
  // let filtered = [];
  let sorted = [];
  let moviesP = [];

  useEffect(() => {
    setMovies(getMovies);
    let genresDB = getGenres();
    let genresAll = [{ _id: "", name: "All Genres" }].concat(genresDB);
    setGenres(genresAll);
  }, []);

  // const getPagedData = () => {
  let filtered = movies;
  if (query)
    filtered = movies.filter((m) =>
      m.title.toLowerCase().startsWith(query.toLowerCase())
    );
  else if (selectedGenre && selectedGenre._id)
    filtered = movies.filter((m) => m.genre._id === selectedGenre._id);

  sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  moviesP = paginate(sorted, currentPage, pageSize);
  // };

  const showMessage = () => {
    if (movies.length === 0) {
      return `There are no more films in db.`;
    } else {
      return `Showing ${filtered.length} movies in the database`;
    }
  };
  const handlePageChange = (page, e) => {
    e.preventDefault();
    setCurrentPage(page);
  };

  const handleDelete = (movie) => {
    let newMovies = movies.filter((item) => item._id !== movie._id);
    setMovies(newMovies);
  };

  const handleLike = (movie) => {
    const nMovies = [...movies];
    const index = nMovies.indexOf(movie);
    nMovies[index] = { ...nMovies[index] };
    nMovies[index].liked = !nMovies[index].liked;
    setMovies(nMovies);
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
    setQuery("");
  };

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handleSearch = (query) => {
    setQuery(query);
    setSelectedGenre(null);
    setCurrentPage(1);
  };

  return (
    <div className="starter-template">
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={handleGenreSelect}
            selectedItem={selectedGenre}
          ></ListGroup>
        </div>
        <div className="col">
          {props.user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ margin: "0 0 15px 0" }}
            >
              New Movie
            </Link>
          )}
          <h5>{showMessage()}</h5>
          <SearchBox value={query} onChange={handleSearch}></SearchBox>
          <MoviesTable
            movies={moviesP}
            onLike={handleLike}
            onDelete={handleDelete}
            onSort={handleSort}
            sortColumn={sortColumn}
          ></MoviesTable>
          <Pagination
            itemsCount={filtered.length}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          ></Pagination>
        </div>
      </div>
    </div>
  );
};

export default Movies;
