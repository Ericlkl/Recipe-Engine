import { createContext } from 'react';

export const initialState: {
  name: string;
  error: string;
  recipe: string;
  showQuery: boolean;
  showRetry: boolean;
  isloading: boolean;
  fetchFruit: () => void;
  fetchRecipe: () => void;
} = {
  name: 'Food',
  error: '',
  recipe: '',
  showQuery: true,
  showRetry: false,
  isloading: false,
  fetchFruit: () => {},
  fetchRecipe: () => {}
};

const FoodContext = createContext(initialState);

export default FoodContext;
