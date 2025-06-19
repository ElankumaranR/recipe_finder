const mongoose = require('mongoose');
 // Assuming RecipeSchema.js exports Recipe
const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  recipes: [{ type: Number, ref: 'Recipe' }]
});
module.exports = mongoose.model('Wishlist', wishlistSchema);