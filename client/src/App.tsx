import React, { useContext } from 'react';
import Prompt from './components/Prompt';
import './App.css';
import { TextField } from '@material-ui/core';
import FoodProvider from './context/Food/FoodProvider';
import FoodContext from './context/Food/FoodContext';

const App: React.FC = () => {
  const { name } = useContext(FoodContext);

  return (
    <FoodProvider>
      <div className='App'>
        <Prompt
          content='Please enter food name'
          submitBtnText='Submit'
          onSubmit={() => {}}
          onClose={() => {}}
        >
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
          />
        </Prompt>
        Hello World
      </div>
    </FoodProvider>
  );
};

export default App;
