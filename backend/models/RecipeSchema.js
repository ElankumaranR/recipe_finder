const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  totalTime: {
    type: Number,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  procedure: {
    type: String,
    required: true
  }
});

module.exports= mongoose.model('Recipe', RecipeSchema);
