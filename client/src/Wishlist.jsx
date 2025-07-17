import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = import.meta.env.VITE_API;

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.uid;

  const removeLinks = (htmlString) =>
    htmlString.replace(/<a[^>]*>(.*?)<\/a>/g, '$1');

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL}/wishlist/${userId}`);
        setWishlist(response.data);
        fetchRecipeDetails(response.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    if (userId) fetchWishlist();
  }, [userId]);

  const fetchRecipeDetails = async (ids) => {
    if (ids.length === 0) return;

    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/informationBulk?ids=${ids.join(',')}&apiKey=${apiKey}`
      );
      setRecipeDetails(response.data);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const removeFromWishlist = async (recipeId) => {
    try {
      await axios.post(`${import.meta.env.VITE_URL}/wishlist/remove`, { userId, recipeId });
      setWishlist(wishlist.filter((id) => id !== recipeId));
      setRecipeDetails(recipeDetails.filter((recipe) => recipe.id !== recipeId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-3xl font-semibold mb-6">Your Wishlist</h2>

      {recipeDetails.length === 0 ? (
        <p>No recipes in your wishlist.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipeDetails.map((recipe) => (
            <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
              <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-bold">{recipe.title}</h3>
                <button
                  className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  View Details
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  onClick={() => removeFromWishlist(recipe.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedRecipe && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setSelectedRecipe(null)}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
                onClick={() => setSelectedRecipe(null)}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4">{selectedRecipe.title}</h2>
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="w-full h-60 object-cover rounded mb-4"
              />
              <h4 className="font-semibold text-lg mb-2">Ingredients:</h4>
              <ul className="list-disc list-inside mb-4 text-sm">
                {selectedRecipe.extendedIngredients.map((ing) => (
                  <li key={ing.id}>{ing.original}</li>
                ))}
              </ul>
              <h4 className="font-semibold text-lg mb-2">Instructions:</h4>
              <p
                className="text-sm"
                dangerouslySetInnerHTML={{
                  __html: removeLinks(selectedRecipe.instructions) || 'No instructions available.',
                }}
              />
              <div className="text-right mt-4">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded"
                  onClick={() => setSelectedRecipe(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
