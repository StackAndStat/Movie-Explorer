import { createContext, useState, useContext, useEffect } from "react";

const WatchedContext = createContext();

export function WatchedProvider({ children }) {
  const [watchedMovies, setWatchedMovies] = useState(() => {
    const storedMovies = localStorage.getItem("watchedMovies");
    return storedMovies ? JSON.parse(storedMovies) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  return (
    <WatchedContext.Provider value={{ watchedMovies, setWatchedMovies }}>
      {children}
    </WatchedContext.Provider>
  );
}

export const useWatched = () => useContext(WatchedContext);
