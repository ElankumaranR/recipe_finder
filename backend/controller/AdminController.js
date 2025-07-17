const Recipe = require('../models/RecipeSchema');
const Admin = require('../models/AdminSchema');
const bcrypt = require('bcryptjs');

exports.addrecipe=async (req, res) => {
  const { label, image, totalTime, calories, ingredients,procedure } = req.body;

  try {
    const newRecipe = new Recipe({
      label,
      image,
      totalTime,
      calories,
      ingredients,
      procedure,
    });

    await newRecipe.save();

    res.status(201).json({ message: 'Recipe saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}
exports.deleterecipes = async (req, res) => {
  await Recipe.findByIdAndDelete(req.params.id);
  res.json({ message: 'Recipe deleted successfully!' });
}
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
    res.json({ message: 'Login successful', admin: { id: admin._id, email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}

exports.adminSignup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAdmin = new Admin({ email,password: hashedPassword });

    await newAdmin.save();

    res.status(201).json({ message: 'Admin created successfully', admin: { email: newAdmin.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
}
