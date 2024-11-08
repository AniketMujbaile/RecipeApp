import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../services/api';
import RecipeForm from '../components/RecipeForm';
import toast from 'react-hot-toast';

const CreateRecipe = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const response = await createRecipe(formData);
      toast.success('Recipe created successfully!');
      navigate(`/recipes/${response.data._id}`);
    } catch (error) {
      toast.error('Failed to create recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Recipe</h1>
      <RecipeForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default CreateRecipe;
