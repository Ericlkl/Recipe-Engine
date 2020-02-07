import _ from 'lodash';
import path from 'path';
import express from 'express';
import { getBestRecipes, existInTable } from './services/fruitManager';

import { readFromCSV } from './services/csvhelper';

const app = express();
app.use(express.json());

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

getBestRecipes('banana');
