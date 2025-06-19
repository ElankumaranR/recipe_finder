const express = require('express');
const router = express.Router();
const{getwishlist,addToWishlist,removeWishlist,getrecipes,login,signup}= require('../controller/UserController');
router.get('/wishlist/:userId',getwishlist );

router.post('/wishlist/add', addToWishlist);

router.post('/wishlist/remove', removeWishlist);

router.get('/recipes', getrecipes);

router.post('/api/login', login);

router.post('/api/signup',signup);

module.exports = router;