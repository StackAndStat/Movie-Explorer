const date = new Date().getFullYear();
function Header() {
  return (
    <header>
      <h1>Movie Explorer 🎬</h1>
    </header>
  );
}

function SearchBar({ onSearchChange, searchTerm }) {
  return (
    <div className="search-bar">
      <input
        value={searchTerm}
        onChange={onSearchChange}
        type="text"
        id="searchInput"
        placeholder="Search your favorite movies..."
      />
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <p>Movie Explorer © {date} </p>
    </footer>
  );
}

export { Header, SearchBar, Footer };
