import Rating from "@mui/material/Rating";
// import { useState } from "react";

export default function BasicRating({ max, value, setValue, imdbID }) {
  // console.log(`rating-${imdbID}`);
  // const [value, setValue] = useState(0);

  return (
    <div className="my-rating">
      <Rating
        className="custom-rating"
        name={`rating-${imdbID}`}
        value={value}
        max={max}
        precision={0.5}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
      <span className="rate-value">{value}</span>
    </div>
  );
}
