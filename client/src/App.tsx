import React, { Fragment } from 'react';

// Components
import Navbar from './components/layout/Navbar';
import SearchPrompt from './components/SearchPrompt';
import RetryPrompt from './components/RetryPrompt';
import Spinner from './components/layout/Spinner';
import Recipes from './components/Recipes';
// Context / Global Store
import RecipeProvider from './context/Recipe/RecipeProvider';

const App: React.FC = () => {
  return (
    <RecipeProvider>
      <Fragment>
        <Navbar />
        <Recipes />
        <SearchPrompt />
        <RetryPrompt />
        <Spinner />
      </Fragment>
    </RecipeProvider>
  );
};

export default App;
