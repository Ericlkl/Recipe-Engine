// Library
import { trim } from 'lodash';
import path from 'path';
import cheerio from 'cheerio';

// API
import { foodDataCentralAPI, tasteDotCom } from '../api';
// Helper
import { readFromCSV } from './csvhelper';
import { isEqualNotCaseSensetive } from './string';

require('dotenv').config({ path: path.resolve(__dirname, '../../', '.env') });

// Check Fruit Exist inside the csv file or not
export const existInTable = async (name: string) => {
  // Read all fruit data from CSV file
  let database = await readFromCSV();
  for (let row of database) {
    if (isEqualNotCaseSensetive(row.Fruit, name)) return true;
  }
  return false;
};

export const isFruit = async (name: string) => {
  const res = await foodDataCentralAPI.get('/', {
    params: {
      api_key: process.env.DATA_CENTRAL_APIKEY,
      generalSearchInput: name,
      pageNumber: 1,
      requireAllWords: true
    }
  });
  return res.data.totalHits > 0 ? true : false;
};

// Go to recipe details page
// Get the steps / name / Ingredients information
export const getRecipeDetails = async (url: string) => {
  // Get Recipe Page in HTML Format
  const recipePage = await tasteDotCom.get(url);
  // Load HTML to cheerio so that
  const $ = cheerio.load(recipePage.data);

  return {
    RecipeName: $('div.col-xs-12 > h1')
      .first()
      .text(),
    Recipe: $('div.recipe-method-step-content')
      .map((i, elem) => trim($(elem).text()))
      .get(),
    Ingredients: $('div.ingredient-description')
      .map((i, elem) => $(elem).text())
      .get()
  };
};

/*
  Search Recipes on taste.com
  name : must be lowercase
  num: How many numbers of Recipes you want (default = 3)
*/
export const searchRecipes = async (name: string, num: number = 3) => {
  // The website only accepted the query name in lowercase
  const searchPage = await tasteDotCom.get(
    `search-recipes/?sort=rating&q=${name.toLowerCase()}`
  );
  // Load HTML to cheerio so that
  const $ = cheerio.load(searchPage.data);

  /* 
    Find out recipes related to the query
    matched recipes are wrapped inside a li element with col-xs-6 col-md-4 class
    We need the top recipes, so I set the sorting to rating
    We also need to remove the featured recipes which are wrapped a extra class promoted-search
  */
  const recipesHrefs: string[] = $('li.col-xs-6.col-md-4')
    .not('.promoted-search')
    .find('.title > h3')
    .find('a')
    .map((i, ele) => ele.attribs.href)
    .get()
    .slice(0, num);

  // Return Recipes details links back
  return recipesHrefs;
};
