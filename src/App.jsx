import { useEffect, useState } from "react";
import { Header, SearchBar, Footer } from "./components/Basics";
import Main, { MovieCard } from "./components/Main";
import Modal from "./components/Modal";
import BasicRating from "./components/Rating";

const API_KEY = "7370ffe9";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [isTrue, setIsTrue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ratings, setRatings] = useState({});
  const [watchedMovies, setWatchedMovies] = useState([]);

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleClicked(imdbID) {
    setSelectedMovie(imdbID);
  }

  function handleRatingChange(imdbID, newValue) {
    setRatings((prev) => ({
      ...prev,
      [imdbID]: newValue,
    }));
  }

  function handleAddToWatchedMovie(movie) {
    const { Title, Year, imdbID } = movie;
    const ratedValue = ratings[imdbID] || 0;
    const newWatchedMovie = { Title, Year, ratedValue };

    console.log("Adding to watched movies:", newWatchedMovie);

    setWatchedMovies((prev) => [...prev, newWatchedMovie]);
  }

  /* ========================================================================= */
  // search effect
  useEffect(() => {
    if (searchTerm.length < 5) {
      setMovies([]);
      setError(""); //Please enter at least 5 characters to search.
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`,
          { signal }
        );

        const data = await response.json();

        if (data.Response === "False" || !data.Search) {
          setMovies([]);
          setError(`No results found for "${searchTerm}". Try another search.`);
          return;
        }

        const uniqueMovies = Array.from(
          new Map(data.Search.map((m) => [m.imdbID, m])).values()
        );

        setMovies(uniqueMovies);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            "Something went wrong while fetching movies. Please try again."
          );
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovies();
    return () => controller.abort();
  }, [searchTerm]);

  /* ========================================================================= */
  // movie details effect
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
          setError("Something went wrong while fetching details.");
        }
      }
    }

    fetchMovieDetails();
    return () => controller.abort();
  }, [selectedMovie]);

  return (
    <div className="full-container">
      <Header />
      <SearchBar onSearchChange={handleSearchChange} searchTerm={searchTerm} />
      <Main error={error} isLoading={isLoading}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClicked={handleClicked}
            setIsTrue={setIsTrue}
          />
        ))}
      </Main>
      <Footer />
      <Modal
        movieDetails={movieDetails}
        isTrue={isTrue}
        setIsTrue={setIsTrue}
        onAddToWatchedMovie={handleAddToWatchedMovie}
      >
        {movieDetails && (
          <BasicRating
            value={ratings[movieDetails.imdbID] || 0}
            ratings={ratings}
            onRate={handleRatingChange}
            movieDetails={movieDetails}
          />
        )}
      </Modal>
    </div>
  );
}

export default App;
