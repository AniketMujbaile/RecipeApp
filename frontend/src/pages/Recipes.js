import React, { useState, useEffect } from 'react';
import { getRecipes } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import SearchFilters from '../components/SearchFilters';
import toast from 'react-hot-toast';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    ingredient: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, [filters]);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const response = await getRecipes(filters);
      setRecipes(response.data);
    } catch (error) {
      toast.error('Failed to fetch recipes');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SearchFilters filters={filters} setFilters={setFilters} />
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
          {recipes.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No recipes found matching your criteria
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Recipes;
