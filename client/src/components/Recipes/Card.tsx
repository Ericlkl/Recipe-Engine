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

type CardSectionRowProps = {
  rowNumber: number;
  content: string;
};

const CardSectionRow: React.FC<CardSectionRowProps> = ({
  rowNumber,
  content
}) => {
  return (
    <div className='recipes_card_section_row'>
      <span className='recipes_card_section_row_num'>{rowNumber}</span>
      <p className='recipes_card_section_row_content'>{content}</p>
    </div>
  );
};

type CardSectionProps = {
  title: string;
  items: string[];
};

const CardSection: React.FC<CardSectionProps> = ({ title, items }) => {
  return (
    <div className='recipes_card_section'>
      <h3 className='recipes_card_section_title'>{title}</h3>
      {items.map((item, i) => (
        <CardSectionRow rowNumber={i + 1} content={item} />
      ))}
    </div>
  );
};

type CarProps = {
  recipe: Recipe;
};

const Card: React.FC<CarProps> = ({ recipe }) => {
  const { RecipeName, Ingredients, Recipe, best } = recipe;
  return (
    <div id={best ? 'best' : ''} className={`recipes_card`}>
      <StarBadge opacity={best ? 100 : 0} />
      <h2 className='recipes_card_title'>{RecipeName}</h2>
      <CardSection title='Ingredients' items={Ingredients} />
      <CardSection title='Recipe' items={Recipe} />
    </div>
  );
};

export default Card;
