import React, { useState } from 'react';
import SearchBar from  './components/SearchBar';  
import RecipeList from './components/RecipeList';  
import { fetchRecipes } from './components/api/api';  
import './components/styles.css';  
import { Navigate } from 'react-router-dom';
const Search = () => {
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (query) => {
    try {
      const data = await fetchRecipes(query);
      setRecipes(data.hits);  // Ensure data.hits exists and has the expected structure
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
   
    return <Navigate to="/login" />;
  }
  

  return (
    <div className="main-container">  

      <h1>Recipe Finder</h1>
      
      <div className="search"> 
      
        <SearchBar onSearch={handleSearch} />  
      </div>
      <div className="recipe">  
        <RecipeList recipes={recipes} /> 
      </div>
    </div>
  );
};

export default Search;
