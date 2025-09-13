import { useState, useEffect } from "react";
import BasicRating from "./Rating";

const API_KEY = "7370ffe9";

function Modal({
  onAddToWatchedMovie,
  selectedMovie,
  isTrue,
  setIsTrue,
  watchedMovies,
}) {
  const [movieDetails, setMovieDetails] = useState({});
  const [ratings, setRatings] = useState({});

  const isWatched = watchedMovies
    .map((movie) => movie.imdbID)
    .includes(selectedMovie);

  useEffect(() => {
    function callback(event) {
      if (event.key === "Escape") {
        setIsTrue(false);
      }
    }

    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, [setIsTrue]);

  useEffect(() => {
    if (!selectedMovie) return;
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchMovieDetails() {
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedMovie}`,
          { signal }
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log("Something went wrong while fetching details.");
        }
      }
    }

    fetchMovieDetails();
    return () => controller.abort();
  }, [selectedMovie]);

  const { Poster, Title, Year, Genre, imdbRating, Plot, imdbID } =
    movieDetails || {};

  function handleWatchedMovie() {
    const newWatchedMovie = {
      imdbID: selectedMovie,
      Title: Title,
      Poster: Poster,
      Year: Year,
      imdbRating: Number(imdbRating),
      // userRating,
    };

    onAddToWatchedMovie(newWatchedMovie);
  }

  function handleRating(imdbID, newValue) {
    setRatings((prev) => {
      return {
        ...prev,
        [imdbID]: newValue,
      };
    });
  }

  if (!isTrue || !movieDetails) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <img src={Poster} alt={Title} />
        <div className="modal-details">
          <h2>{Title}</h2>
          <p>
            <strong>Year:</strong> {Year}
          </p>
          <p>
            <strong>Genre:</strong> {Genre}
          </p>
          <p className="rating">⭐ {imdbRating}</p>
          <p className="plot">
            <strong>Plot:</strong> {Plot}...
          </p>

          <div className="my-rating">
            {!isWatched && (
              <BasicRating
                max={10}
                imdbID={imdbID}
                value={ratings[imdbID] || 0}
                setValue={(newValue) => handleRating(imdbID, newValue)}
              />
            )}

            {isWatched && <p>You rated this movie: {ratings[imdbID]} ⭐</p>}
          </div>
          <div className="modal-buttons">
            <button className="close-btn" onClick={() => setIsTrue(false)}>
              Close
            </button>

            {!isWatched && (
              <button className="add-to-list-btn" onClick={handleWatchedMovie}>
                <a href="http://localhost:5173/Movie-Explorer/watched">
                  + Add to list
                </a>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
