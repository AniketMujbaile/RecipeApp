import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipe, deleteRecipe, saveRecipe } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const response = await getRecipe(id);
      setRecipe(response.data);
    } catch (error) {
      toast.error('Failed to fetch recipe details');
      navigate('/recipes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await deleteRecipe(id);
        toast.success('Recipe deleted successfully');
        navigate('/recipes');
      } catch (error) {
        toast.error('Failed to delete recipe');
      }
    }
  };

  const handleSave = async () => {
    try {
      await saveRecipe(id);
      toast.success('Recipe saved to your collection');
    } catch (error) {
      toast.error('Failed to save recipe');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative h-64">
          <img
            src={recipe.images[0]?.url || '/placeholder-recipe.jpg'}
            alt={recipe.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900">{recipe.name}</h1>
            <div className="flex space-x-2">
              {user && (
                <>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Save Recipe
                  </button>
                  {user._id === recipe.createdBy && (
                    <>
                      <button
                        onClick={() => navigate(`/recipes/edit/${id}`)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
            <span>Prep Time: {recipe.prepTime}</span>
            <span>Cook Time: {recipe.cookTime}</span>
            <span>Servings: {recipe.servings}</span>
            <span>Difficulty: {recipe.difficulty}</span>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">Ingredients</h2>
            <ul className="mt-2 space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-gray-600">{ingredient.quantity}</span>
                  <span className="ml-2">{ingredient.name}</span>
                  {ingredient.isOptional && (
                    <span className="ml-2 text-sm text-gray-500">(optional)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900">Instructions</h2>
            <ol className="mt-2 space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <span className="font-medium mr-4">{index + 1}.</span>
                  <span className="text-gray-600">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-6">
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;