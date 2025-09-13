import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieExplorer from "./pages/MovieExplorer";
import WatchedMovies from "./pages/WatchedMovies";
import { WatchedProvider } from "./context/WatchedContext";

function App() {
  return (
    <WatchedProvider>
      <Router basename="/Movie-Explorer">
        {/* Add basename here */}
        <Routes>
          <Route path="/" element={<MovieExplorer />} />
          <Route path="/watched" element={<WatchedMovies />} />
        </Routes>
      </Router>
    </WatchedProvider>
  );
}

export default App;
