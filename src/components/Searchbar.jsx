import { useState } from "react";

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSubmit(query);
    setQuery("");
  };

  return (
    <header className="searchbar">
      <form className="form" onSubmit={handleSubmit}>
        <button type="submit" className="button">
          Search
        </button>

        <input
          className="input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}