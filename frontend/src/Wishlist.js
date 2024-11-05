import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './search/components/RecipeCard.css';

const apiKey = 'e853d5e10b66414ea825020d21772872'; // Replace with your Spoonacular API key

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.uid;
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/wishlist/${userId}`);
        setWishlist(response.data);
        fetchRecipeDetails(response.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, [userId]);

  const fetchRecipeDetails = async (wishlist) => {
    if (wishlist.length === 0) return;

    const recipeIds = wishlist.join(',');
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds}&apiKey=${apiKey}`);
      setRecipeDetails(response.data);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    }
  };

  const removeFromWishlist = async (recipeId) => {
    try {
      await axios.post('http://localhost:5000/wishlist/remove', { userId, recipeId });
      setWishlist(wishlist.filter(recipe => recipe !== recipeId));
      setRecipeDetails(recipeDetails.filter(recipe => recipe !== recipeId));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handleShow = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleClose = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="container">
      <h2 className="my-4">Your Wishlist</h2>
      <div className="row">
        {recipeDetails.length === 0 ? (
          <p>No recipes in your wishlist.</p>
        ) : (
          recipeDetails.map(recipe => (
            <div className="col-md-4" key={recipe.id}>
              <div className="card mb-4">
                <img src={recipe.image} alt={recipe.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{recipe.title}</h5>
                  <button className="btn btn-primary" onClick={() => handleShow(recipe)}>View Details</button>
                  <button className="btn btn-danger" onClick={() => removeFromWishlist(recipe.id)}>Remove from Wishlist</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedRecipe && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{selectedRecipe.title}</h5>
                <button type="button" className="close" onClick={handleClose} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <img src={selectedRecipe.image} alt={selectedRecipe.title} className="img-fluid" />
                <h6>Ingredients:</h6>
                <ul>
                  {selectedRecipe.extendedIngredients.map(ingredient => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                  ))}
                </ul>
                <h6>Instructions:</h6>
                <p>{selectedRecipe.instructions}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
