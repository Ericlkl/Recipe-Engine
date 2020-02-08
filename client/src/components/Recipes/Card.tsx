import React from 'react';
import { Recipe } from '../../types';

type StarBadgeProps = {
  opacity: number;
};
const StarBadge: React.FC<StarBadgeProps> = ({ opacity }) => {
  return (
    <div style={{ opacity }} className='recipes_card_best'>
      <i className='far fa-star' />
    </div>
  );
};

type CarProps = {
  recipe: Recipe;
};

const Card: React.FC<CarProps> = ({ recipe }) => {
  const { RecipeName, Ingredients, best } = recipe;

  // render Ingredients to each rows
  const renderIngredients = () =>
    Ingredients.map((item, i) => (
      <div className='recipes_card_section_row'>
        <span className='recipes_card_section_row_num'>{i + 1}</span>
        <p className='recipes_card_section_row_content'>{item}</p>
      </div>
    ));

  return (
    <div id={best ? 'best' : ''} className={`recipes_card`}>
      <StarBadge opacity={best ? 100 : 0} />
      <h2 className='recipes_card_title'>{RecipeName}</h2>
      <div className='recipes_card_section'>
        <h3 className='recipes_card_section_title'>Ingredients</h3>
        {renderIngredients()}
      </div>
    </div>
  );
};

export default Card;
