import _ from 'lodash';
import express, { json } from 'express';
import path from 'path';

const app = express();
app.use(json());

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

import { storeInfoToCSV } from './services/csvhelper';
import { foodDataCentralAPI } from './api';

storeInfoToCSV({
  Fruit: 'Apple',
  Recipe: 'Banana',
  Ingredients: 'Hello'
});

const identifyFruit = async (name: string) => {
  const res = await foodDataCentralAPI.get('/', {
    params: {
      api_key: process.env.DATA_CENTRAL_APIKEY,
      generalSearchInput: 'Banana'
    }
  });

  console.log(res.data);
};

identifyFruit('Banana');
