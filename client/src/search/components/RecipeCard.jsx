import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

const apiKey = import.meta.env.VITE_API;

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.uid;

  const removeLinks = (htmlString) => htmlString.replace(/<a[^>]*>(.*?)<\/a>/g, '$1');

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
            <div key={recipe.id} className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
              <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-lg mb-3" />

              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => setSelectedRecipe(recipe)}
                  className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  <i className="fas fa-eye mr-1" /> Details
                </button>
                <button
                  onClick={() => removeFromWishlist(recipe.id)}
                  className="text-xs px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                >
                  <i className="fas fa-trash-alt mr-1" /> Remove
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
          ></div>

          {/* Modal Content */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b p-4">
                <h5 className="text-xl font-semibold">{selectedRecipe.title}</h5>
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="text-gray-500 hover:text-black text-2xl font-bold"
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
              <div className="p-4 space-y-4">
                <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-56 object-cover rounded-md" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Ingredients:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {selectedRecipe.extendedIngredients.map((ingredient) => (
                      <li key={ingredient.id}>{ingredient.original}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Instructions:</h3>
                  <p
                    className="text-sm text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: removeLinks(selectedRecipe.instructions) || 'No instructions available.'
                    }}
                  ></p>
                </div>
                <p><strong>Ready In:</strong> {selectedRecipe.readyInMinutes} minutes</p>
                <p><strong>Servings:</strong> {selectedRecipe.servings}</p>
              </div>
              <div className="flex justify-end p-4 border-t">
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
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
