import React, { Fragment, useContext } from 'react';
import './App.css';

// Components
import SearchPrompt from './components/SearchPrompt';

// Context / Global Store
import FoodProvider from './context/Food/FoodProvider';
import FoodContext from './context/Food/FoodContext';

const App: React.FC = () => {
  const { name, error, showQuery, fetchFruit } = useContext(FoodContext);

  return (
    <FoodProvider>
      <Fragment>
        <SearchPrompt />
      </Fragment>
    </FoodProvider>
  );
};

export default App;
