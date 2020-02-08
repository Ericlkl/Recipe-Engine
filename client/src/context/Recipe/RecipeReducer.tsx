import { RecipeAction } from '../action';
import { initialState } from './RecipeContext';
import { Recipe } from '../../types';

type State = {
  name: string;
  msg: string;
  error: boolean;
  recipes: Recipe[];
  isloading: boolean;
  openQuery: boolean;
  openRetry: boolean;
};

// Action Type
// It is used to limit Specific Action must following with specific payload
type Action =
  | {
      type:
        | RecipeAction.SHOW_QUERY
        | RecipeAction.DISMISS_RETRY
        | RecipeAction.DISMISS_QUERY
        | RecipeAction.CLEAR_RECIPES
        | RecipeAction.IS_LOADING;
    }
  | {
      type: RecipeAction.SHOW_RETRY;
      payload: string;
    }
  | {
      type: RecipeAction.FETCH_RECIPES;
      payload: Recipe[];
    };

export default (state: State, action: Action) => {
  switch (action.type) {
    // Display Query Prompt
    case RecipeAction.SHOW_QUERY:
      return { ...state, openQuery: true, openRetry: false, error: false };
    // Display Retry Prompt
    case RecipeAction.SHOW_RETRY:
      return {
        ...state,
        openRetry: true,
        msg: action.payload,
        isloading: false
      };
    // Successfully Fetch Recipes
    case RecipeAction.FETCH_RECIPES:
      return { ...state, recipes: action.payload, isloading: false };
    // Dismiss Query Prompt
    case RecipeAction.DISMISS_QUERY:
      return { ...state, openQuery: false };
    // Dismiss Retry Prompt
    case RecipeAction.DISMISS_RETRY:
      return { ...state, openRetry: false };
    // Application is fetching Recipes
    case RecipeAction.IS_LOADING:
      return { ...state, isloading: true, recipes: [], openQuery: false };
    default:
      return state;
  }
};
