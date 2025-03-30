import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';


function ArrowLocationDialog({ open, onClose, onConfirm}) {
  return (
        <Dialog
            open={open}
            keepMounted
            onClose={onClose}
            aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle>Please input the arrow locations of the previous set:</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                target face to click
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onConfirm}>Confirm</Button>
        </DialogActions>
        </Dialog>
    
    );
}


export default ArrowLocationDialog;