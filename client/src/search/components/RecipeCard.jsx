import React, { useState } from 'react';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';

const RecipeCard = ({ recipe, userId }) => {
  const [modalShow, setModalShow] = useState(false);
  const [wishlistAdded, setWishlistAdded] = useState(false);

  const handleModalToggle = () => {
    setModalShow(!modalShow);
  };

  const removeLinks = (htmlString) => {
    return htmlString.replace(/<a[^>]*>(.*?)<\/a>/g, '$1');
  };

  const addToWishlist = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_URL}/wishlist/add`, { userId, recipeId: recipe._id });
      setWishlistAdded(true);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
        <p className="text-sm text-gray-400">{recipe._id}</p>
        <h3 className="text-lg font-semibold mb-2">{recipe.label}</h3>
        <img src={recipe.image} alt={recipe.label} className="w-full h-48 object-cover rounded-lg mb-3" />
        <p className="text-gray-600">Calories: {Math.round(recipe.calories)} kcal</p>
        <p className="text-gray-600 mb-3">Total Time: {recipe.totalTime ? `${recipe.totalTime} minutes` : 'N/A'}</p>

        <button
          onClick={addToWishlist}
          className={`w-full py-2 mb-2 rounded text-white font-medium transition ${
            wishlistAdded ? 'bg-green-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
          disabled={wishlistAdded}
        >
          <i className={`fa${wishlistAdded ? 's' : 'r'} fa-heart mr-2`}></i>
          {wishlistAdded ? 'Added to Wishlist' : 'Add to Wishlist'}
        </button>

        <button
          onClick={handleModalToggle}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition"
        >
          View More
        </button>
      </div>

      {/* Modal & Overlay */}
      {modalShow && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={handleModalToggle}
          ></div>

          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b p-4">
                <h5 className="text-xl font-semibold">{recipe.label}</h5>
                <button
                  onClick={handleModalToggle}
                  className="text-gray-500 hover:text-black text-2xl font-bold"
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>
              <div className="p-4 space-y-4">
                <img src={recipe.image} alt={recipe.label} className="w-full h-56 object-cover rounded-md" />
                <div>
                  <h3 className="text-lg font-medium mb-2">Ingredients:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient.text || ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Procedure:</h3>
                  <p
                    className="text-sm text-gray-700"
                    dangerouslySetInnerHTML={{ __html: removeLinks(recipe.procedure) || 'No instructions available.' }}
                  ></p>
                </div>
                <p><strong>Total Time:</strong> {recipe.totalTime ? `${recipe.totalTime} minutes` : 'N/A'}</p>
                <p><strong>Calories:</strong> {Math.round(recipe.calories)}</p>
              </div>
              <div className="flex justify-end p-4 border-t">
                <button
                  onClick={handleModalToggle}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RecipeCard;
