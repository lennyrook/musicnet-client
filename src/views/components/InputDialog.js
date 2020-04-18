import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography'

const InputDialog = React.forwardRef((props, ref) => (
    <Dialog 
        id={props.dialogId} 
        className='input-dialog' 
        open={props.isOpen} 
        onClose={props.handleClose} 
        aria-labelledby='form-dialog-title'
        ref={ref}
    >
        <DialogTitle id="form-dialog-title" disableTypography ref={ref}>
            <Typography variant='h6' className='title'>
                { props.title }
            </Typography>
        </DialogTitle>
        <DialogContent ref={ref}>

            { props.children }

        </DialogContent>
        <DialogActions>
            <Button onClick={props.handleClose}>
                { props.closeLabel }
            </Button>
            <Button onClick={props.handleAccept} color="secondary">
                { props.acceptLabel }
            </Button>
        </DialogActions>
    </Dialog>
))

export default InputDialog