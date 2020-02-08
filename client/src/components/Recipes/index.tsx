import React, { Fragment, useContext } from 'react';
// Context / Global State
import RecipeContext from '../../context/Recipe/RecipeContext';

import Card from './Card';

export default () => {
  const { recipes } = useContext(RecipeContext);

  const renderRecipes = () => recipes.map(recipe => <Card recipe={recipe} />);

  if (recipes.length === 0) return <Fragment />;

  return <section className='recipes'>{renderRecipes()}</section>;
};
