import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecipe, updateRecipe } from '../services/api';
import RecipeForm from '../components/RecipeForm';
import toast from 'react-hot-toast';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
      toast.error('Failed to fetch recipe');
      navigate('/recipes');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      await updateRecipe(id, formData);
      toast.success('Recipe updated successfully!');
      navigate(`/recipes/${id}`);
    } catch (error) {
      toast.error('Failed to update recipe');
    } finally {
      setLoading(false);
    }
  };

  if (loading || !recipe) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Recipe</h1>
      <RecipeForm initialData={recipe} onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default EditRecipe;