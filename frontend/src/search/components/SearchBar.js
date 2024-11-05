import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [timeLimit, setTimeLimit] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleIngredientsChange = (event) => {
    setIngredients(event.target.value);
  };

  const handleTimeLimitChange = (event) => {
    setTimeLimit(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim() || ingredients.trim() || timeLimit) {
      onSearch(query, ingredients, timeLimit);
      setQuery('');
      setIngredients('');
      setTimeLimit('');
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for recipes..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Ingredients (comma-separated)"
          value={ingredients}
          onChange={handleIngredientsChange}
          className="search-input"
        />
        <input
          type="number"
          placeholder="Time limit (minutes)"
          value={timeLimit}
          onChange={handleTimeLimitChange}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
