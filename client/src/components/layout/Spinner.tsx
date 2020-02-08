// Library
import React, { useContext } from 'react';

// UI Component
import { Dialog, DialogContent, CircularProgress } from '@material-ui/core';
// Context / Global State
import RecipeContext from '../../context/Recipe/RecipeContext';

const Spinner = () => {
  const { isloading } = useContext(RecipeContext);
  return (
    <Dialog open={isloading}>
      <DialogContent>
        <CircularProgress style={{ margin: '1.5rem' }} />
      </DialogContent>
    </Dialog>
  );
};

export default Spinner;
