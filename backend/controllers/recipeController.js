const Recipe = require('../models/Recipe');

const recipeController = {
  async create(req, res) {
    try {
      const recipe = new Recipe({
        ...req.body,
        createdBy: req.user._id
      });
      await recipe.save();
      res.status(201).json(recipe);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const { category, ingredient, search } = req.query;
      let query = {};

      if (category) {
        query.category = category;
      }

      if (ingredient) {
        query['ingredients.name'] = { $regex: ingredient, $options: 'i' };
      }

      if (search) {
        query.$text = { $search: search };
      }

      const recipes = await Recipe.find(query)
        .populate('createdBy', 'email')
        .sort({ createdAt: -1 });

      res.json(recipes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const recipe = await Recipe.findById(req.params.id)
        .populate('createdBy', 'email');
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const recipe = await Recipe.findOneAndUpdate(
        { _id: req.params.id, createdBy: req.user._id },
        req.body,
        { new: true }
      );
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.json(recipe);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const recipe = await Recipe.findOneAndDelete({
        _id: req.params.id,
        createdBy: req.user._id
      });
      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }
      res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = recipeController;
