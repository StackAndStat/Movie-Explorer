import { useState } from "react";
import { Header } from "../components/Header.jsx";
import { Footer } from "../components/Footer.jsx";
import { SearchBar } from "../components/SearchBar.jsx";
import MainContainer, { MovieCard } from "../components/mainContainer.jsx";
import Modal from "../components/Modal.jsx";
import { useMovies } from "../context/useMovies.jsx";
import { useWatched } from "../context/WatchedContext.jsx";

function MovieExplorer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isTrue, setIsTrue] = useState(false);

  const { movies, isLoading, error } = useMovies(searchTerm);
  const { watchedMovies, setWatchedMovies } = useWatched();

  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const handleClicked = (imdbID, title) => {
    console.log("Movie title:", title + " Movie ID: " + imdbID);
    setSelectedMovie(imdbID);
    setIsTrue((prev) => !prev);
  };

  const AddMovie = (movie) => {
    setWatchedMovies((prevWatchedMovies) => [...prevWatchedMovies, movie]);
  };

  return (
    <div className="full-container">
      <Header />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearchChange={handleSearchChange}
      />
      <MainContainer error={error} isLoading={isLoading}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClicked={handleClicked}
            setIsTrue={setIsTrue}
          />
        ))}
      </MainContainer>
      <Footer />

      <Modal
        isTrue={isTrue}
        setIsTrue={setIsTrue}
        selectedMovie={selectedMovie}
        onAddToWatchedMovie={AddMovie}
        watchedMovies={watchedMovies}
      />
    </div>
  );
}

export default MovieExplorer;
