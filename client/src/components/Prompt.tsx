import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

type PromptProps = {
  content: string;
  submitBtnText: string;
  onSubmit: () => void;
  onClose: () => void;
};

const Prompt: React.FC<PromptProps> = ({
  content,
  children,
  submitBtnText,
  onSubmit,
  onClose
}) => {
  return (
    <Dialog open aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>
        Blackbook.AI Food Ingredients System
      </DialogTitle>

      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onSubmit} color='primary'>
          {submitBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Prompt;
