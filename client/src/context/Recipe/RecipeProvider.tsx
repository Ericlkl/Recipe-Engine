// Library
import axios from 'axios';
import React, { useReducer } from 'react';
// Context Related files
import RecipeContext, { initialState } from './RecipeContext';
import RecipeReducer from './RecipeReducer';
import { RecipeAction } from '../action';

const RecipeProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(RecipeReducer, initialState);

  // Methods
  const fetchRecipes = async (name: string) => {
    // Show is loading
    dispatch({ type: RecipeAction.IS_LOADING });

    try {
      const res = await axios.get(`/api/recipes/?name=${name}`);
      dispatch({
        type: RecipeAction.FETCH_RECIPES,
        payload: res.data
      });
    } catch (error) {
      console.log('Fetch Data Unsuccessfully!');
      // Not Success, Show msg to user let them try again
      dispatch({
        type: RecipeAction.SHOW_RETRY,
        payload: error.response.data.msg
      });
    }
  };

  // Shows the Query Prompt on Screen
  const showQuery = () => dispatch({ type: RecipeAction.SHOW_QUERY });

  // Dismiss the Query Prompt
  const dismissQuery = () => {
    console.log('Hello');
    dispatch({
      type: RecipeAction.DISMISS_QUERY
    });
  };

  // Dismiss the Retry Prompt
  const dismissRetry = () => {
    console.log('Hello');
    dispatch({
      type: RecipeAction.DISMISS_RETRY
    });
  };

  return (
    <RecipeContext.Provider
      value={{
        name: state.name,
        msg: state.msg,
        error: state.error,
        recipes: state.recipes,
        openQuery: state.openQuery,
        openRetry: state.openRetry,
        isloading: state.isloading,
        showQuery,
        fetchRecipes,
        dismissQuery,
        dismissRetry
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
