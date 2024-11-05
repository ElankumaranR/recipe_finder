const apiKey = 'e853d5e10b66414ea825020d21772872';

export const fetchRecipes = async (query) => {
  const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`;
  
  try {
    // Fetch the search results
    const searchResponse = await fetch(searchUrl);
    const searchData = await searchResponse.json();

    if (!searchResponse.ok) {
      console.error('Error fetching recipes:', searchData);
      throw new Error(searchData.message || 'Failed to fetch recipes');
    }

    // Extract recipe IDs from the search results
    const recipeIds = searchData.results.map(recipe => recipe.id).join(',');

    // If there are no recipes, return an empty array
    if (recipeIds.length === 0) {
      return [];
    }

    // Fetch detailed information for the recipes using their IDs
    const infoUrl = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds}&apiKey=${apiKey}`;
    const infoResponse = await fetch(infoUrl);
    const infoData = await infoResponse.json();

    if (!infoResponse.ok) {
      console.error('Error fetching recipe details:', infoData);
      throw new Error(infoData.message || 'Failed to fetch recipe details');
    }

    return infoData; // Returns the detailed recipe information
  } catch (error) {
    console.error('Error:', error);
    return []; // Return an empty array in case of an error
  }
};
