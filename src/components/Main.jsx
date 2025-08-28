function Main({ children, error, isLoading }) {
  return (
    <main>
      <div className="error-msg">
        <p>{error}</p>
      </div>

      {isLoading && (
        <div className="loading">
          <p>Loading...</p>
        </div>
      )}

      <div className="movie-container">{children}</div>
    </main>
  );
}

export default Main;

function MovieCard({ movie, onClicked, setIsTrue }) {
  const { Title, Year, Poster, imdbID } = movie;
  return (
    <div
      className="movie-card"
      onClick={() => {
        onClicked(imdbID);
        setIsTrue(true);
      }}
    >
      <img src={Poster} alt={Title} />
      <div className="movie-info">
        <h3>{Title}</h3>
        <p>{Year}</p>
      </div>
    </div>
  );
}

export { MovieCard };
