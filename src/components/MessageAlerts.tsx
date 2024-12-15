import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


// eslint-disable-next-line react-refresh/only-export-components
export enum TYPE_MESSAGES {
    SUCCESS,
    INFO,
    ERROR,
    NOT_STATUS
}

interface Props {
    open: boolean;
    type: TYPE_MESSAGES,
    message: string,
    closeFunction?: (event?: React.SyntheticEvent | Event, reason?: string) => void
    
}


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const  CustomizedSnackbars = ({open, type, closeFunction, message}: Props) => {
//   const [open, setOpen] = React.useState(false);

//   const handleClick = () => {
//     setOpen(true);
//   };

//   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpen(false);
//   };

  return (
    <Snackbar 
        open={open} autoHideDuration={6000} 
        onClose={closeFunction}
    >
        <Alert onClose={closeFunction} severity={
                type === TYPE_MESSAGES.ERROR ? 'error' : 
                type === TYPE_MESSAGES.SUCCESS ? 'success' : 'error'
            } sx={{ width: '100%' }}>
           {message}
        </Alert>
    </Snackbar>
  );
}