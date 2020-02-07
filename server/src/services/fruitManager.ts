import cheerio from 'cheerio';
import path from 'path';
import { foodDataCentralAPI, tasteDotCom } from '../api';

// Types
import { Recipe } from '../types';

require('dotenv').config({ path: path.resolve(__dirname, '../', '.env') });

export const identifyFruit = async (name: string) => {
  const res = await foodDataCentralAPI.get('/', {
    params: {
      api_key: process.env.DATA_CENTRAL_APIKEY,
      generalSearchInput: name
    }
  });

  console.log(res.data);
};

// Go to recipe details page
// Get the steps / name / Ingredients information
export const getRecipeDetails = async (fruit: string, url: string) => {
  // Get Recipe Page in HTML Format
  const recipePage = await tasteDotCom.get(url);
  // Load HTML to cheerio so that
  const $ = cheerio.load(recipePage.data);

  return {
    Fruit: fruit,
    RecipeName: $('div.col-xs-12 > h1')
      .first()
      .text(),
    Recipe: $('div.recipe-method-step-content')
      .map((i, elem) => $(elem).text())
      .get(),
    Ingredients: $('div.ingredient-description')
      .map((i, elem) => $(elem).text())
      .get()
  };
};

// Search Recipes on taste.com
// name : must be lowercase
export const searchRecipes = async (name: string, num: number = 3) => {
  // The website only accepted the query name in lowercase
  const searchPage = await tasteDotCom.get(
    `search-recipes/?sort=rating&q=${name.toLowerCase()}`
  );
  // Load HTML to cheerio so that
  const $ = cheerio.load(searchPage.data);

  // Find out recipes related to the query
  // matched recipes are wrapped inside a li element with col-xs-6 col-md-4 class
  // We need the top recipes, so I set the sorting to rating
  // We also need to remove the featured recipes which are wrapped a extra class promoted-search
  const recipesHrefs: string[] = $('li.col-xs-6.col-md-4')
    .not('.promoted-search')
    .find('.title > h3')
    .find('a')
    .map((i, ele) => ele.attribs.href)
    .get()
    .slice(0, num);

  return recipesHrefs;
};

export const getBestRecipes = async (name: string) => {
  try {
    // Get Recipes which related to the fruit but Non-Featured
    const recipesHrefs = await searchRecipes(name);

    // Get the top 3 Recipes details
    let recipes: Recipe[] = [];
    for (let href of recipesHrefs) {
      recipes.push(await getRecipeDetails(name, href));
    }

    const bestRecipe = recipes.reduce((prev, current) => {
      return prev.Ingredients.length > current.Ingredients.length
        ? prev
        : current;
    });

    console.log([{ ...bestRecipe, best: true }, ...recipes]);
  } catch (error) {
    console.error(error);
    console.log('Server unable to get the best recipe ...');
  }
};
