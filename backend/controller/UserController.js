const Wishlist = require('../models/WishlistSchema');
const User = require('../models/UserSchema');
const Recipe = require('../models/RecipeSchema');

exports.getwishlist=async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });
    res.json(wishlist ? wishlist.recipes : []);
  } catch (error) {
    res.status(500).send('Error fetching wishlist');
  }
}
exports.addToWishlist = async (req, res) => {
  const { userId, recipeId } = req.body;
  console.log(recipeId);
  try {
    let wishlist = await Wishlist.findOne({ userId });
    if (!wishlist) {
      wishlist = new Wishlist({ userId, recipes: [] });
    }
    if (!wishlist.recipes.includes(recipeId)) {
      wishlist.recipes.push(recipeId);
      await wishlist.save();
    }
    console.log(3);
    res.status(200).send('Recipe added to wishlist');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding to wishlist');
  }
}
exports.removeWishlist=async (req, res) => {
  const { userId, recipeId } = req.body;
  try {
    const wishlist = await Wishlist.findOne({ userId });
    if (wishlist) {
      wishlist.recipes = wishlist.recipes.filter(id => id!== recipeId);
      await wishlist.save();
    }
    res.status(200).send('Recipe removed from wishlist');
  } catch (error) {
    res.status(500).send('Error removing from wishlist');
  }
}

exports.getrecipes = async (req, res) => {
  try {
    const { label, ingredients, timeLimit } = req.query;

    let filter = {};

    if (label) {
      filter.label = { $regex: label, $options: 'i' }; 
    }

    if (ingredients) {
      const ingredientList = ingredients.split(',').map(ing => ing.trim());
      filter.ingredients = { $all: ingredientList }; 
    }

    if (timeLimit) {
      filter.totalTime = { $lte: parseInt(timeLimit, 10) };
    }

    const recipes = await Recipe.find(filter);

    res.json(recipes);
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.login = async (req, res) => {
  const { identifier} = req.body;

  try {
   
    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });

    if (!user) {
      return res.status(400).json({ message: 'User not found. Please check your username or email.' });
    }


    res.status(200).json({
      message: 'Login successful',
      user: {
        username: user.username,
        email: user.email,
        uid: user.uid, 
      },
    });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Error logging in. Please try again later.' });
  }
}

exports.signup= async (req, res) => {
  const { username, email, uid } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const newUser = new User({ username, email, uid }); 
    await newUser.save();

    res.status(201).json({ message: 'User created successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating user' });
  }
}