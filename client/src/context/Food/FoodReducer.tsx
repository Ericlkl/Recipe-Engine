import { FoodAction } from '../action';
import { initialState } from './FoodContext';

type Action = {
  payload: any;
  type: string;
};

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case FoodAction.DISPLAY_QUERY:
      return { ...state, showQuery: true };
    case FoodAction.DISPLAY_TRYAGAIN:
      return { ...state, showRetry: true };
    case FoodAction.FETCH_FRUIT:
      return { ...state, food: action.payload };
    case FoodAction.FETCH_RECIPE:
      return { ...state, recipe: action.payload };
    default:
      return state;
  }
};
