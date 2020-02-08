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
  open: boolean;
  content: string;
  submitBtnText: string;
  onSubmit: () => void;
  onClose: () => void;
};

const Prompt: React.FC<PromptProps> = ({
  open,
  content,
  children,
  submitBtnText,
  onSubmit,
  onClose
}) => {
  return (
    <Dialog open={open} aria-labelledby='form-dialog-title'>
      <DialogTitle id='form-dialog-title'>Recipe Search</DialogTitle>

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
