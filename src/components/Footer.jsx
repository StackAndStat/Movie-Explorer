const date = new Date().getFullYear();
function Footer() {
  return (
    <footer>
      <p>Movie Explorer © {date}</p>
    </footer>
  );
}

export { Footer };
