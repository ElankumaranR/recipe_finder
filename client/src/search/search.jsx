import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import RecipeList from './components/RecipeList';
import { fetchRecipes } from './components/api/api';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Search = () => {
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (query, ingredients, timeLimit) => {
    try {
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

      const response = await axios.get(`${import.meta.env.VITE_URL}/recipes`, {
        params: { label: query, ingredients, timeLimit }
      });

      const mongoData = response.data.map(recipe => ({
        _id: recipe._id,
        label: recipe.label,
        image: recipe.image,
        calories: recipe.calories,
        totalTime: recipe.totalTime,
        ingredients: recipe.ingredients,
        procedure: recipe.procedure
      }));

      setRecipes([...mongoData, ...apiRecipes]);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">Recipe Finder</h1>

      <div className="mb-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div>
        <RecipeList recipes={recipes} userId={user.uid} />
      </div>
    </div>
  );
};

export default Search;
