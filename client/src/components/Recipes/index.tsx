import React, { Fragment, useContext } from 'react';
// Context / Global State
import RecipeContext from '../../context/Recipe/RecipeContext';

export default () => {
  const { recipes } = useContext(RecipeContext);

  if (recipes.length === 0) return <Fragment />;
  console.log(recipes);
  return (
    <div>
      <h3>Recipe</h3>
    </div>
  );
};
