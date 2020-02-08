import { createContext } from 'react';

// types
import { Recipe } from '../../types';

// initial State for Food Context Global Storage
export const initialState: {
  name: string;
  msg: string;
  error: boolean;
  recipes: Recipe[];
  isloading: boolean;
  openQuery: boolean;
  openRetry: boolean;
  showQuery: () => void;
  dismissQuery: () => void;
  dismissRetry: () => void;
  fetchRecipes: (name: string) => void;
} = {
  name: 'Food',
  msg: '',
  error: false,
  recipes: [],
  openQuery: true,
  openRetry: true,
  isloading: false,
  showQuery: () => {},
  fetchRecipes: async (name: string) => {},
  dismissQuery: () => {},
  dismissRetry: () => {}
};

const FoodContext = createContext(initialState);

export default FoodContext;
