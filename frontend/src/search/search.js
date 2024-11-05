import React, { useState } from 'react';
import SearchBar from './components/SearchBar';  
import RecipeList from './components/RecipeList';  
import { fetchRecipes } from './components/api/api';  // API fetch logic for external API
import axios from 'axios';  // Axios for fetching recipes from MongoDB
import './components/styles.css';  
import { Navigate } from 'react-router-dom';

const Search = () => {
  const [recipes, setRecipes] = useState([]);  // Store combined recipes
  const handleSearch = async (query, ingredients, timeLimit) => {
    try {
      // Fetch data from the Spoonacular API
      const data = await fetchRecipes(query, ingredients, timeLimit);
      const apiRecipes = data.map(recipe => ({
        _id: recipe.id,
        uri: recipe.sourceUrl,
        label: recipe.title,
        image: recipe.image,
        calories: recipe.pricePerServing,
        totalTime: recipe.readyInMinutes,
        ingredients: recipe.extendedIngredients.map(i => i.name),
        procedure: recipe.summary
      }));
  
      // Fetch data from MongoDB
      const response = await axios.get(`http://localhost:5000/recipes`, {
        params: { label: query, ingredients, timeLimit }
      });
      const mongoData = response.data.map(recipe => ({
        _id: recipe._id,
        label: recipe.label,
        image: recipe.image,
        calories: recipe.calories,
        totalTime: recipe.totalTime,
        ingredients: recipe.ingredients,
        procedure: recipe.procedure,
      }));
  
      // Combine and set the recipes
      const combinedRecipes = [...mongoData, ...apiRecipes];
      setRecipes(combinedRecipes);
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
        <RecipeList recipes={recipes} userId = {user.uid}/>  
      </div>
    </div>
  );
};

export default Search;
