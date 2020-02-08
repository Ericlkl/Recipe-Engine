import React, { Fragment } from 'react';
import './App.css';

// Components
import Navbar from './components/layout/Navbar';
import SearchPrompt from './components/SearchPrompt';
import RetryPrompt from './components/RetryPrompt';

// Context / Global Store
import RecipeProvider from './context/Recipe/RecipeProvider';

const App: React.FC = () => {
  return (
    <RecipeProvider>
      <Fragment>
        <Navbar />
        <SearchPrompt />
        <RetryPrompt />
      </Fragment>
    </RecipeProvider>
  );
};

export default App;
