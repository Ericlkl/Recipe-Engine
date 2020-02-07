import _ from 'lodash';
import { storeInfoToCSV } from './services/csvhelper';

storeInfoToCSV({
  Fruit: 'Apple',
  Recipe: 'Banana',
  Ingredients: 'Hello'
});
