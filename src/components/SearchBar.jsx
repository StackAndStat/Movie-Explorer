import { useEffect, useRef } from "react";

function SearchBar({ onSearchChange, searchTerm, setSearchTerm }) {
  const inputEl = useRef(null);

  useEffect(() => {
    function callback(event) {
      if (document.activeElement === inputEl.current) return;
      if (event.key === "Enter") {
        inputEl.current.focus();
        setSearchTerm("");
      }
    }
    document.addEventListener("keydown", callback);

    return () => document.removeEventListener("keydown", callback);
  }, [setSearchTerm]);

  return (
    <div className="search-bar">
      <input
        value={searchTerm}
        onChange={onSearchChange}
        type="text"
        placeholder="Search your favorite movies..."
        ref={inputEl}
      />
    </div>
  );
}

export { SearchBar };
