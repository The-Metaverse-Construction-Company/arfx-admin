import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import React from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  onSuccess: () => void;
  onClose: () => void;
}

const ConfirmDialog: React.FunctionComponent<ConfirmDialogProps> = (
  Props: ConfirmDialogProps
) => {
  return (
    <Dialog open={Props.open} onClose={Props.onClose} maxWidth="sm" fullWidth>
      <DialogTitle id="alert-dialog-title">{Props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {Props.description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={Props.onClose}>Cancel</Button>
        <Button onClick={Props.onSuccess} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
