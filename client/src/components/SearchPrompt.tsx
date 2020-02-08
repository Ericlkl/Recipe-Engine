// Library
import React, { useContext, useState } from 'react';
import { isEmpty } from 'lodash';
import { formatString } from '../helper/string';

// Context / Global State
import RecipeContext from '../context/Recipe/RecipeContext';

// Component
import { TextField } from '@material-ui/core';
import Prompt from './layout/Prompt';

type SearchPromptState = {
  errorMsg: string;
  value: string;
};

const SearchPrompt: React.FC = () => {
  const { openQuery, fetchRecipes, dismissQuery } = useContext(RecipeContext);
  const initState = {
    errorMsg: '',
    value: ''
  };

  const [state, setState] = useState<SearchPromptState>(initState);
  const { value, errorMsg } = state;

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setState({ ...state, value: e.target.value });

  // On Submit Btn Click
  const onSubmit = async () => {
    if (isEmpty(value)) {
      return setState({ ...state, errorMsg: 'Please enter food name!' });
    }
    await fetchRecipes(formatString(value));
    // Reset State, Cleaning up the previous Record
    setState(initState);
  };

  return (
    <Prompt
      open={openQuery}
      content='Please enter fruit name'
      submitBtnText='Submit'
      onSubmit={onSubmit}
      onClose={dismissQuery}
    >
      <TextField
        value={value}
        onChange={onInputChange}
        autoFocus
        margin='dense'
        id='name'
        label='fruit name'
        type='text'
        fullWidth
        variant='outlined'
        error={!isEmpty(errorMsg)}
        helperText={errorMsg}
      />
    </Prompt>
  );
};

export default SearchPrompt;
