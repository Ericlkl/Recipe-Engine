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
      // Update Recipes to Global State
      dispatch({
        type: RecipeAction.FETCH_RECIPES,
        payload: res.data.results
      });
      // Display Sucess Msg to client and allow them try again
      showRetry(res.data.msg);
    } catch (error) {
      // Not Success, Show msg to user let them try again
      showRetry(error.response.data.msg);
    }
  };

  const showRetry = (msg: string) =>
    dispatch({
      type: RecipeAction.SHOW_RETRY,
      payload: msg
    });

  // Shows the Query Prompt on Screen
  const showQuery = () => dispatch({ type: RecipeAction.SHOW_QUERY });

  // Dismiss the Query Prompt
  const dismissQuery = () =>
    dispatch({
      type: RecipeAction.DISMISS_QUERY
    });

  // Dismiss the Retry Prompt
  const dismissRetry = () =>
    dispatch({
      type: RecipeAction.DISMISS_RETRY
    });

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
