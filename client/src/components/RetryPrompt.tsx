// Navbar
import React, { useContext } from 'react';
// Component
import Prompt from './layout/Prompt';
// Context / Global State
import RecipeContext from '../context/Recipe/RecipeContext';

const RetryPrompt: React.FC = () => {
  const { openRetry, msg, showQuery, dismissRetry } = useContext(RecipeContext);

  return (
    <Prompt
      open={openRetry}
      content={msg}
      submitBtnText='Retry'
      onSubmit={showQuery}
      onClose={dismissRetry}
    />
  );
};

export default RetryPrompt;
