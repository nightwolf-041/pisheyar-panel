import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, CircularProgress} from '@material-ui/core/';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { red, green } from '@material-ui/core/colors';

import './categoryDeleteDialog.css'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const styles = makeStyles(theme => ({
  buttonDanger: {
    color: red[500],
   '&:hover': {
    color: red[700],
    boxShadow: 'none',
    backgroundColor: red[100],
    },
    backgroundColor: '#fff',
    boxShadow: 'none'
  },
  wrapper: {
    position: 'relative',
    backgroundColor: 'none',
    boxShadow: 'none'
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));


export default function CategoryDeleteDialog(props) {

  const classes = styles();

  return (
    <div>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {/* <DialogTitle id="alert-dialog-slide-title" className="text-right" >{"تاییدیه"}</DialogTitle> */}
        {/* <Divider /> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            از حذف این مورد اطمینان دارید ؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary" >
            بازگشت
          </Button>
          <div className={classes.wrapper}>
              <Button
                  variant="contained"
                  className={classes.buttonDanger}
                  disabled={props.delButtonLoading}
                  onClick={props.handleDeleteNode}
                  >
                  حذف
              </Button>
              {props.delButtonLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}