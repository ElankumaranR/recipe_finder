const apiKey = 'e853d5e10b66414ea825020d21772872';
export const fetchRecipes = async (query, ingredients, timeLimit) => {
  let searchUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`;

  if (query) {
    searchUrl += `&query=${encodeURIComponent(query)}`;
  }
  if (ingredients) {
    searchUrl += `&includeIngredients=${encodeURIComponent(ingredients)}`;
  }
  if (timeLimit) {
    searchUrl += `&maxReadyTime=${encodeURIComponent(timeLimit)}`;
  }

  try {
    const searchResponse = await fetch(searchUrl);

    console.log('Response Status:', searchResponse.status);
    console.log('Content-Type:', searchResponse.headers.get('content-type'));

    if (!searchResponse.ok || !searchResponse.headers.get('content-type')?.includes('application/json')) {
      throw new Error(`Unexpected response format or status: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    console.log('Search Data:', searchData);

    if (!searchData.results || searchData.results.length === 0) {
      return [];
    }

    const recipeIds = searchData.results.map(recipe => recipe.id).join(',');
    if (!recipeIds) {
      return [];
    }

    const infoUrl = `https://api.spoonacular.com/recipes/informationBulk?ids=${recipeIds}&apiKey=${apiKey}`;
    const infoResponse = await fetch(infoUrl);

    if (!infoResponse.ok || !infoResponse.headers.get('content-type')?.includes('application/json')) {
      throw new Error(`Unexpected response format or status: ${infoResponse.status}`);
    }

    const infoData = await infoResponse.json();
    return infoData;
  } catch (error) {
    console.error('Error:', error);
    return []; 
  }
};
