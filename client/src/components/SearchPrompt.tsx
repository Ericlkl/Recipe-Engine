// Library
import React, { useContext, useState } from 'react';
import _ from 'lodash';

// Context / Global State
import FoodContext from '../context/Food/FoodContext';

// Component
import { TextField } from '@material-ui/core';
import Prompt from './Prompt';

const SearchPrompt: React.FC = () => {
  const { error, showQuery, fetchFruit } = useContext(FoodContext);

  const [fruitName, setFruitName] = useState('');

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFruitName(e.target.value);

  return (
    <Prompt
      open={showQuery}
      content='Please enter food name'
      submitBtnText='Submit'
      onSubmit={fetchFruit}
      onClose={() => {}}
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
        error={!_.isEmpty(error)}
        helperText={!_.isEmpty(error) && 'Incorrect entry.'}
        variant='outlined'
      />
    </Prompt>
  );
};

export default SearchPrompt;
