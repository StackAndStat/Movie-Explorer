import { useState, useEffect } from "react";
const API_KEY = "7370ffe9";

function useMovies(searchTerm) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.length < 5) {
      setMovies([]);
      setError("");
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

  return { movies, isLoading, error };
}

export { useMovies };
