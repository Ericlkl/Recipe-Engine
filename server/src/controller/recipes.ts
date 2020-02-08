// Library
import { upperFirst } from 'lodash';
import { RequestHandler } from 'express';

// Helper
import { storeInfoToCSV } from '../services/csvhelper';
import { searchRecipes, getRecipeDetails } from '../services/fruitManager';
import { formatString } from '../services/string';
// Types
import { Recipe } from '../types';

export const getBestRecipes: RequestHandler = async (req, res) => {
  try {
    // Format the params to make sure wont get ant mistake
    // When search recipes on taste.com
    const name = formatString(req.query.name);

    // Get Recipes which related to the fruit but Non-Featured
    const recipesHrefs = await searchRecipes(name);

    // Get the top 3 Recipes details
    let recipes: Recipe[] = [];
    for (let href of recipesHrefs) {
      recipes.push(await getRecipeDetails(href));
    }

    // Compare Recipe one by one, find out the recipe which has most Ingredients
    const bestRecipe = recipes.reduce((prev, current) => {
      return prev.Ingredients.length > current.Ingredients.length
        ? prev
        : current;
    });

    // Store the best recipe for this fruit into CSV file
    await storeInfoToCSV({
      Fruit: upperFirst(name),
      Ingredients: bestRecipe.Ingredients.join(' '),
      Recipe: bestRecipe.Recipe.join(' ')
    });

    // Return top 3 recipes result for client
    res.json({
      message:
        'Success! Best recipe has been saved to csv! Here is the top 3 recipes',
      results: recipes.map(recipe => {
        recipe.best = recipe.RecipeName === bestRecipe.RecipeName && true;
        return recipe;
      })
    });
  } catch (error) {
    console.error(error);
    console.log('Server unable to get the best recipe ...');
    res.status(401).json({ error: 'Server unable to get the best recipe ...' });
  }
};
