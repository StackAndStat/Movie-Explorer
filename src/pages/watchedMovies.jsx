// src/components/WatchedMovies.jsx
import { useWatched } from "../context/WatchedContext";

export default function WatchedMovies() {
  const { watchedMovies, setWatchedMovies } = useWatched();

  return (
    <div className="saved-movies-full-container">
      <div className="saved-movies-container">
        <header>
          <h1 className="title">🎥 Movies You've Watched</h1>
          <span className="pill">{watchedMovies.length} Movies</span>
        </header>

        <section className="grid">
          {watchedMovies.map((movie) => (
            <div className="card" key={movie.imdbID}>
              <div className="poster-wrap">
                <img className="poster" src={movie.Poster} alt={movie.Title} />
                <div className="rating-badge">
                  <p>You rated: ⭐ {movie.ratedValue}/10</p>
                </div>
              </div>

              <div className="body">
                <h3>{movie.Title}</h3>
                <div className="actions">
                  <button className="btn">View Details</button>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      setWatchedMovies((prev) =>
                        prev.filter((m) => m.imdbID !== movie.imdbID)
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
