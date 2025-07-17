import React, { useState, useRef } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const formRef = useRef(null);

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
    <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-xl shadow-md">
      <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
        <input
          type="text"
          placeholder="Search for recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Ingredients (comma-separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Time limit (minutes)"
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
