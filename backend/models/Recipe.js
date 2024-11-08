const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  isOptional: {
    type: Boolean,
    default: false
  }
});

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  }
});

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  ingredients: [ingredientSchema],
  instructions: [{
    type: String,
    required: true
  }],
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true
  },
  prepTime: {
    type: String,
    required: true
  },
  cookTime: {
    type: String,
    required: true
  },
  servings: {
    type: Number,
    required: true
  },
  tags: [{
    type: String,
    index: true
  }],
  images: [imageSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

recipeSchema.index({ name: 'text', 'ingredients.name': 'text' });

module.exports = mongoose.model('Recipe', recipeSchema);