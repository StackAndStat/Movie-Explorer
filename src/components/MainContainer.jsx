function MainContainer({ children, error, isLoading }) {
  return (
    <main>
      {error && (
        <div className="error-msg">
          <p>{error}</p>
        </div>
      )}
      {isLoading && (
        <div className="loading">
          <p>Searching...</p>
        </div>
      )}
      {!error && !isLoading && (
        <div className="movie-container">{children}</div>
      )}
    </main>
  );
}

function MovieCard({ movie, onClicked }) {
  const { Title, Year, Poster, imdbID } = movie;
  return (
    <div className="movie-card" onClick={() => onClicked(imdbID, Title)}>
      <img src={Poster} alt={Title} />
      <div className="movie-info">
        <h3>{Title}</h3>
        <p>{Year}</p>
      </div>
    </div>
  );
}

export default MainContainer;
export { MovieCard };
