import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dash.css'; // Custom CSS for additional styling
import { useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard'; // Importing RecipeCard

const Dashboard = () => {
  const [recipes, setRecipes] = useState([]);
  const [formData, setFormData] = useState({
    label: '',
    image: '',
    totalTime: '',
    calories: '',
    ingredients: [''],
    procedure: '',
  });
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false); // For showing the overlay form
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/recipes');
      setRecipes(res.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleIngredientChange = (e, index) => {
    const updatedIngredients = formData.ingredients.map((ingredient, i) =>
      i === index ? e.target.value : ingredient
    );
    setFormData({
      ...formData,
      ingredients: updatedIngredients,
    });
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, ''],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/recipes', formData);
      setMessage(res.data.message || 'Recipe saved successfully!');
      fetchRecipes();
      handleCloseForm(); // Close the form after saving
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error saving recipe');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/');
  };

  const handleDelete = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:5000/recipes/${recipeId}`);
      setMessage('Recipe deleted successfully!');
      fetchRecipes(); 
    } catch (error) {
      setMessage('Error deleting recipe');
    }
  };

  const handleAddRecipeClick = () => {
    setShowForm(true);
    setMessage(''); // Reset message when opening the form
    document.body.classList.add('modal-open'); // Prevent background scroll
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setFormData({
      label: '',
      image: '',
      totalTime: '',
      calories: '',
      ingredients: [''],
      procedure: '',
    }); // Reset formData to initial state
    document.body.classList.remove('modal-open'); // Restore background scroll
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Recipe Admin</a>
        <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
      </nav>

      <div className="container mt-4">
        <h1 className="text-center mb-4">Welcome to the Recipe Dashboard</h1>
        <p className="lead text-center">
          Discover, add, and manage your recipes with ease. Here, you can create, view, and organize
          recipes to share with your friends and family.
        </p>

        <div className="d-flex justify-content-center mb-4">
          <button
            className="btn btn-success"
            onClick={handleAddRecipeClick}
          >
            Add Recipe
          </button>
        </div>

        <div className="row">
          {recipes.map((recipe) => (
            <div className="col-md-4" key={recipe._id}>
              <RecipeCard recipe={recipe} onDelete={() => handleDelete(recipe._id)} />
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="overlay-form">
          <div className="modal-content">
            <h2 className="text-center">Add a New Recipe</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Recipe Name</label>
                <input
                  type="text"
                  name="label"
                  className="form-control"
                  value={formData.label}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  name="image"
                  className="form-control"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="image-preview mt-2">
                {formData.image && <img src={formData.image} alt="Recipe Preview" className="img-fluid rounded" />}
              </div>
              <div className="form-group">
                <label>Total Time (minutes)</label>
                <input
                  type="number"
                  name="totalTime"
                  className="form-control"
                  value={formData.totalTime}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Calories</label>
                <input
                  type="number"
                  name="calories"
                  className="form-control"
                  value={formData.calories}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Ingredients</label>
                {formData.ingredients.map((ingredient, index) => (
                  <input
                    key={index}
                    type="text"
                    className="form-control mb-2"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(e, index)}
                    required
                  />
                ))}
                <button
                  type="button"
                  className="btn btn-secondary mt-2"
                  onClick={handleAddIngredient}
                >
                  Add Ingredient
                </button>
              </div>
              <div className="form-group">
                <label>Procedure</label>
                <textarea
                  name="procedure"
                  className="form-control"
                  value={formData.procedure}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Save Recipe</button>
              <button
                type="button"
                className="btn btn-danger btn-block mt-2"
                onClick={handleCloseForm} // Close the form without submitting
              >
                Close
              </button>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
