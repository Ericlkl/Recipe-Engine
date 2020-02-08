// Library
import express, { RequestHandler } from 'express';
import path from 'path';
import { check, validationResult, param, query } from 'express-validator';

// Services
import { isFruit, existInTable } from '../services/fruitManager';

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
    console.log('Exist In table');
    return next();
  } else if (await isFruit(name)) {
    console.log('Is Fruit');
    return next();
  } else {
    return res.status(201).json({
      error: `I don't believe this is a fruit`,
      result: []
    });
  }
};

// Check Express Request wheither match our setup rules or not
const validateParams: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), result: [] });
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
