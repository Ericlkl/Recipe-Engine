// Library
import React, { useContext } from 'react';
// UI Components
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button
} from '@material-ui/core';

// Context
import RecipeContext from '../../context/Recipe/RecipeContext';

const Navbar: React.FC = () => {
  const { showQuery } = useContext(RecipeContext);
  return (
    <AppBar position='static'>
      <Container>
        <Toolbar>
          <Typography variant='h6' style={{ flexGrow: 1 }}>
            Recipe Search Engine
          </Typography>
          <Button onClick={showQuery} color='inherit'>
            Search
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
