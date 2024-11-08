const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userController = {
  async register(req, res) {
    try {
      const user = new User(req.body);
      await user.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid login credentials');
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async saveRecipe(req, res) {
    try {
      const user = req.user;
      const { recipeId } = req.body;
      user.savedRecipes.addToSet(recipeId);
      await user.save();
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = userController;