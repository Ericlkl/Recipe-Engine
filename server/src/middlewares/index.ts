// Library
import path from 'path';
import express, { RequestHandler } from 'express';
import { upperFirst } from 'lodash';
import { validationResult, query } from 'express-validator';

// Services
import { isFruit, existInTable } from '../services/fruitManager';
import { storeInfoToCSV } from '../services/csvhelper';

// Serve Static Assets from client folder
// So that client can download the website assets
export const staticAssetsMiddleware = express.static(
  path.resolve(__dirname, '../../../', 'client', 'build')
);

// Checking the query user inserted is a fruint name or not
export const identifyFruitMiddleware: RequestHandler = async (
  req,
  res,
  next
) => {
  const { name } = req.query;

  if (await existInTable(name)) {
    return next();
  } else if (await isFruit(name)) {
    // Store the best recipe for this fruit into CSV file
    await storeInfoToCSV({
      Fruit: upperFirst(name),
      Ingredients: '',
      Recipe: ''
    });
    return next();
  } else {
    return res.status(400).json({
      msg: `I don't believe this is a fruit`
    });
  }
};

// Check Express Request wheither match our setup rules or not
const validateParams: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return error message in string format
    return res.status(400).json({
      msg: errors
        .array()
        .map(err => err.msg)
        .join(' & ')
    });
  }
  next();
};

// Get Recipe End Point Params Validator
// It must pass name as param and it must be in string format
export const getRecipeEndPointValidator = [
  query('name', 'Fruit Name is required')
    .not()
    .isEmpty(),
  query('name', 'Fruit Name must be string').isString(),
  validateParams,
  identifyFruitMiddleware
];
