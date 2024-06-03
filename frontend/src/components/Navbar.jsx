import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const [publicPlaylists, setPublicPlaylists] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem("userDetails");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const fetchPublicPlaylists = async () => {
    try {
      const res = await axios.get("http://localhost:8000/public-playlists");
      setPublicPlaylists(res.data);
    } catch (error) {
      console.error("Error fetching public playlists", error);
    }
  };

  useEffect(() => {
    fetchPublicPlaylists();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await axios.get(
        `http://www.omdbapi.com?s=${query}&apikey=9e835846`
      );
      setMovies(res.data.Search);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    setUser(null);
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg sticky-top navbar-light bg-dark">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand text-white">
            <img
              src="https://www.schielemuseum.org/wp-content/uploads/2022/12/MovieMania.png"
              alt="Movie Mania Logo"
              width="60"
              height="50"
            />
          </Link>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/"} className="nav-link text-white">
                  Home
                </Link>
              </li>
            </ul>
            {user ? (
              <div className="d-flex">
                <Link
                  to={"/profile"}
                  className="nav-link text-white me-4"
                >
                  Welcome, {user.name.split(" ")[0]}
                </Link>
                <button
                  className="btn btn-outline-light"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="d-flex">
                <Link to={"/register"} className="nav-link text-white me-3">
                  Register
                </Link>
                <Link to={"/login"} className="nav-link text-white">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="row mt-3 p-3">
        {movies ? (
          movies.map((movie) => (
            <div className="col-md-2 mb-4" key={movie.imdbID}>
              <Link to={`/movieDetail/${movie.imdbID}`}>
                <div className="card">
                  <img
                    src={movie.Poster}
                    className="card-img-top"
                    alt={movie.Title}
                    width={"100%"}
                    height={"350px"}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {movie.Title.substring(0, 15)}
                    </h5>
                    <p className="card-text">{movie.Year}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <h2 className="text-secondary text-center">No Movies Found</h2>
        )}
      </div>
    </div>
  );
};

export default Navbar;
