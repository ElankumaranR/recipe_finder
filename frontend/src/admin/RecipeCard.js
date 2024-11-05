import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RecipeCard.css'; // Your custom styles
import '@fortawesome/fontawesome-free/css/all.min.css';

const RecipeCard = ({ recipe, onDelete }) => {
  const [modalShow, setModalShow] = useState(false);

  const handleModalToggle = () => {
    setModalShow(!modalShow);
  };

  

  return (
    <>
      <div className="recipe-card">
        <h3 className="recipe-title">{recipe.label}</h3>
        <img src={recipe.image} alt={recipe.label} className="recipe-image" />
        <p className="recipe-calories">Calories: {Math.round(recipe.calories)} kcal</p>
        <p className="recipe-time">Total Time: {recipe.totalTime ? `${recipe.totalTime} minutes` : 'N/A'}</p>
        
        <button onClick={handleModalToggle} className="btn btn-primary">View More</button>
        <button onClick={onDelete} className="btn btn-danger">Delete</button>
      </div>

      {/* Custom Overlay */}
      {modalShow && <div className="custom-overlay" onClick={handleModalToggle}></div>}

      {/* Bootstrap Modal */}
      <div className={`modal ${modalShow ? 'show' : ''}`} style={{ display: modalShow ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{recipe.label}</h5>
              <button type="button" className="close" onClick={handleModalToggle}>&times;</button>
            </div>
            <div className="modal-body">
              <img src={recipe.image} alt={recipe.label} className="img-fluid" />
              <h6>Ingredients:</h6>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
              <h6>Procedure:</h6>
              <p>{recipe.procedure}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleModalToggle}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
