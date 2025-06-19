const express = require('express');
const router = express.Router();
const {addrecipe,deleterecipes,adminLogin,adminSignup} = require('../controller/AdminController');
router.delete('/recipes/:id', deleterecipes);
router.post('/recipes', addrecipe);
router.post('/admin/login',adminLogin );
router.post('/admin/signup',adminSignup );
module.exports = router;