import Rating from "@mui/material/Rating";

export default function BasicRating({ value, onRate, movieDetails, ratings }) {
  const { imdbID } = movieDetails;

  return (
    <>
      {ratings[imdbID] ? (
        <span className="custom-rating">
          You rated this movie: {ratings[imdbID]}
        </span>
      ) : (
        <>
          <Rating
            className="custom-rating"
            name={`rating-${imdbID}`}
            value={value}
            max={10}
            precision={0.5}
            onChange={(event, newValue) => {
              onRate(imdbID, newValue);
              console.log("You rated", imdbID, "with a score of", newValue);
            }}
          />
          <span className="rate-value">{value}</span>
        </>
      )}
    </>
  );
}
