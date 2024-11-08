import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={recipe.images[0]?.url || '/placeholder-recipe.jpg'}
        alt={recipe.images[0]?.alt || recipe.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{recipe.name}</h3>
        <p className="text-sm text-gray-600">{recipe.category}</p>
        <div className="mt-2 flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            Prep: {recipe.prepTime}
          </span>
          <span className="text-sm text-gray-500">
            Cook: {recipe.cookTime}
          </span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {recipe.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link
          to={`/recipes/${recipe._id}`}
          className="mt-4 block text-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;