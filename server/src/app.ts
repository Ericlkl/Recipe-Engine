import _ from 'lodash';
import path from 'path';
import express from 'express';
import { getBestRecipes } from './services/fruitManager';

const app = express();
app.use(express.json());

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

getBestRecipes('banana');
// const hello = async () => {
//   const obj = await getRecipeDetails(
//     '/recipes/banana-bread/10c8bf87-6c19-4ffd-b056-2b87ce915717'
//   );
//   console.log(obj);
// };
// hello();
