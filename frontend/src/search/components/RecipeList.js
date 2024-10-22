import React from 'react';
import RecipeCard from './RecipeCard';
import './RecipeList.css';
const RecipeList = ({ recipes }) => {
  return (
    <div className="recipe-list"> {/* Use a CSS class to define grid styles */}
      {recipes && recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard key={recipe.recipe.uri} recipe={recipe.recipe} /> // Ensure this is the correct structure
        ))
      ) : (
        <p>No recipes found. Please try another search.</p>
      )}
    </div>
  );
};

export default RecipeList;
