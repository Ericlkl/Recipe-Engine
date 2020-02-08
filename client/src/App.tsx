import React, { Fragment } from 'react';
import './App.css';

// Components
import Navbar from './components/layout/Navbar';
import SearchPrompt from './components/SearchPrompt';
import RetryPrompt from './components/RetryPrompt';
import Spinner from './components/layout/Spinner';

// Context / Global Store
import RecipeProvider from './context/Recipe/RecipeProvider';

const App: React.FC = () => {
  return (
    <RecipeProvider>
      <Fragment>
        <Navbar />
        <SearchPrompt />
        <RetryPrompt />
        <Spinner />
      </Fragment>
    </RecipeProvider>
  );
};

export default App;
