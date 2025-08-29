import Rating from "@mui/material/Rating";

export default function BasicRating({ value, onRate, movieDetails }) {
  const { imdbID } = movieDetails;

  return (
    <>
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
    </>
  );
}
