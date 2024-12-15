/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { GridRowId, GridRowModel } from '@mui/x-data-grid';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


interface Props {
    message: string;
    open: boolean;
    row?: GridRowModel;
    id?: GridRowId;
    handleDelete?: (id: string) => void;
    handleClose: () => void;
    handleAction?: (row: GridRowModel) => void;
}

export const AlertDialogSlide = ({open,message, handleAction, handleClose, row, id, handleDelete}: Props) => {

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Atención"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => {
            if(handleAction){
                handleAction(row!);
            }
            if(handleDelete){
                handleDelete(id!.toString())
            }
              handleClose();
          }}>Aceptar</Button>
        </DialogActions>
      </Dialog>
  );
}