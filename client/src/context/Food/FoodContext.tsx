import { createContext } from 'react';

// initial State for Food Context Global Storage
export const initialState: {
  name: string;
  error: string;
  recipe: string;
  showQuery: boolean;
  showRetry: boolean;
  isloading: boolean;
  fetchFruit: (name: string) => void;
  fetchRecipe: () => void;
} = {
  name: 'Food',
  error: '',
  recipe: '',
  showQuery: true,
  showRetry: false,
  isloading: false,
  fetchFruit: (name: string) => {},
  fetchRecipe: () => {}
};

const FoodContext = createContext(initialState);

export default FoodContext;
