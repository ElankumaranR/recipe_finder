import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ recipes, userId }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4">
      {recipes && recipes.length > 0 ? (
        recipes.map((recipe) => (
          <RecipeCard key={recipe.uri || recipe._id} recipe={recipe} userId={userId} />
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">No recipes found. Please try another search.</p>
      )}
    </div>
  );
};

export default RecipeList;
