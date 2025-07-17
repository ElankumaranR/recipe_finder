import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard';

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
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/recipes`);
      setRecipes(res.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleIngredientChange = (e, index) => {
    const updatedIngredients = formData.ingredients.map((ing, i) =>
      i === index ? e.target.value : ing
    );
    setFormData(prev => ({ ...prev, ingredients: updatedIngredients }));
  };

  const handleAddIngredient = () => {
    setFormData(prev => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_URL}/recipes`, formData);
      setMessage(res.data.message || 'Recipe saved successfully!');
      fetchRecipes();
      handleCloseForm();
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
      await axios.delete(`${import.meta.env.VITE_URL}/recipes/${recipeId}`);
      setMessage('Recipe deleted successfully!');
      fetchRecipes();
    } catch {
      setMessage('Error deleting recipe');
    }
  };

  const handleAddRecipeClick = () => {
    setShowForm(true);
    setMessage('');
    document.body.classList.add('modal-open'); // to prevent scroll behind modal
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
    });
    document.body.classList.remove('modal-open');
  };

  return (
    <div className="dashboard-container">
      <nav className="navbar navbar-dark bg-dark px-3">
        <h1 className="navbar-brand mb-0">Recipe Admin</h1>
        <button className="btn btn-success" onClick={handleLogout}>Logout</button>
      </nav>

      <div className="container mt-4">
        <h1 className="text-center mb-4">Welcome to the Recipe Dashboard</h1>
        <p className="lead text-center">
          Discover, add, and manage your recipes with ease. Here, you can create, view, and organize recipes to share with your friends and family.
        </p>

        <div className="text-center mb-4">
          <button className="btn btn-success" onClick={handleAddRecipeClick}>
            Add Recipe
          </button>
        </div>

        <div className="row">
          {recipes.map(recipe => (
            <div className="col-md-4 mb-4" key={recipe._id}>
              <RecipeCard recipe={recipe} onDelete={() => handleDelete(recipe._id)} />
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="overlay-form">
          <div className="modal-content p-4">
            <h2 className="text-center mb-3">Add a New Recipe</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
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

              <div className="form-group mb-3">
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

              {formData.image && (
                <div className="image-preview mb-3 text-center">
                  <img src={formData.image} alt="Recipe Preview" className="img-fluid rounded" />
                </div>
              )}

              <div className="form-group mb-3">
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

              <div className="form-group mb-3">
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

              <div className="form-group mb-3">
                <label>Ingredients</label>
                {formData.ingredients.map((ingredient, index) => (
                  <input
                    key={index}
                    type="text"
                    className="form-control mb-2"
                    value={ingredient}
                    onChange={e => handleIngredientChange(e, index)}
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

              <div className="form-group mb-3">
                <label>Procedure</label>
                <textarea
                  name="procedure"
                  className="form-control"
                  value={formData.procedure}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Save Recipe
              </button>

              <button
                type="button"
                className="btn btn-danger w-100 mt-2"
                onClick={handleCloseForm}
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
