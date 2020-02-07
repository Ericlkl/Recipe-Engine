import React, { useReducer } from 'react';
import { searchFruitInTable } from '../../services/excel';
// Context Related files
import FoodContext, { initialState } from './FoodContext';
import FoodReducer from './FoodReducer';
import { FoodAction } from '../action';

const FoodProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(FoodReducer, initialState);

  const fetchFruit = (name: string) => {
    searchFruitInTable(name);
  };

  const fetchRecipe = () => {};

  return (
    <FoodContext.Provider
      value={{
        name: state.name,
        recipe: state.recipe,
        error: state.error,
        showQuery: state.showQuery,
        showRetry: state.showRetry,
        isloading: state.isloading,
        fetchFruit,
        fetchRecipe
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};

export default FoodProvider;
