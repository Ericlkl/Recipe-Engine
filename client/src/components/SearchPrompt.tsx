// Library
import React, { useContext, useState } from 'react';
import { isEmpty } from 'lodash';

// Context / Global State
import RecipeContext from '../context/Recipe/RecipeContext';

// Component
import { TextField } from '@material-ui/core';
import Prompt from './layout/Prompt';

const SearchPrompt: React.FC = () => {
  const { openQuery, fetchRecipes, dismissQuery } = useContext(RecipeContext);

  const [fruitName, setFruitName] = useState('');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFruitName(e.target.value);

  // On Submit Btn Click
  const onSubmit = async () => fetchRecipes(fruitName);

  return (
    <Prompt
      open={openQuery}
      content='Please enter fruit name'
      submitBtnText='Submit'
      onSubmit={onSubmit}
      onClose={dismissQuery}
    >
      <TextField
        value={fruitName}
        onChange={onInputChange}
        autoFocus
        margin='dense'
        id='name'
        label='fruit name'
        type='text'
        fullWidth
        variant='outlined'
      />
    </Prompt>
  );
};

export default SearchPrompt;
