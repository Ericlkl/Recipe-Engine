import _ from 'lodash';
import path from 'path';
import express from 'express';
import cheerio from 'cheerio';

// Types
import { Recipe } from './types';
// Helper function
import { storeInfoToCSV } from './services/csvhelper';
// API
import { foodDataCentralAPI, tasteDotCom } from './api';

const app = express();
app.use(express.json());

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Go to recipe details page
// Get the steps / name / Ingredients information
const getRecipeDetails = async (fruit: string, url: string) => {
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

const searchFruitRecipes = async (name: string) => {
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
    .slice(0, 3);

  let recipes: Recipe[] = [];

  for (let href of recipesHrefs) {
    recipes.push(await getRecipeDetails(name, href));
  }
  console.log(recipes.length);
};

searchFruitRecipes('banana');
// const hello = async () => {
//   const obj = await getRecipeDetails(
//     '/recipes/banana-bread/10c8bf87-6c19-4ffd-b056-2b87ce915717'
//   );
//   console.log(obj);
// };
// hello();
