function Modal({
  movieDetails,
  isTrue,
  setIsTrue,
  children,
  onAddToWatchedMovie,
}) {
  if (!isTrue || !movieDetails) return null;

  const { Poster, Title, Year, Genre, imdbRating, Plot } = movieDetails;
  return (
    <div className="modal">
      <div className="modal-content">
        <img src={Poster} alt={Title} />
        <div className="modal-details">
          <h2>{Title}</h2>
          <p>
            <strong>Year: {Year}</strong>
          </p>
          <p>
            <strong>Genre: {Genre}</strong>
          </p>
          <p className="rating">
            ⭐ <span>{imdbRating}</span>
          </p>
          <p className="plot">
            <strong>Plot: {Plot}</strong>
          </p>

          <div className="my-rating">{children}</div>
          <div className="modal-buttons">
            <button className="close-btn" onClick={() => setIsTrue(false)}>
              Close
            </button>

            <button
              className="add-to-list-btn"
              onClick={() => onAddToWatchedMovie(movieDetails)}
            >
              + Add to list
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
