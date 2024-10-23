import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const RecipeForm = () => {
  const [formData, setFormData] = useState({
    label: '',
    image: '',
    totalTime: '',
    calories: '',
    ingredients: ['']
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleIngredientChange = (e, index) => {
    const updatedIngredients = formData.ingredients.map((ingredient, i) =>
      i === index ? e.target.value : ingredient
    );
    setFormData({
      ...formData,
      ingredients: updatedIngredients
    });
  };

  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, '']
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to your backend API to save recipe
      const res = await axios.post('http://localhost:5000/recipes', formData);
      setMessage(res.data.message || 'Recipe saved successfully!');
    } catch (err) {
      setMessage(err.response.data.message || 'Error saving recipe');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add a Recipe</h2>
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
            className="btn btn-secondary"
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </button>
        </div>
        <button type="submit" className="btn btn-primary">Save Recipe</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RecipeForm;
