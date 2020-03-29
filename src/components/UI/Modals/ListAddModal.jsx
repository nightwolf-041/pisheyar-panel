// this file is /list route Add modal ... its imported in PanelMain component and handle with its header 

import React from 'react';
import {connect} from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Switch, TextField, Divider, FormControl, FormControlLabel, Select, InputLabel, MenuItem} from '@material-ui/core';
import * as mainListActionCreators from '../../../storeConfigure/actionCreators/mainListActionCreators'

import './listAddModal.css'

let width
if(window.innerWidth > 992) {
  width = 'calc(100% - 250px)'
} else{
  width = '100%'
}

const styles = makeStyles(theme => ({
  modal: {
    position: 'fixed',
    top: '10%',
    left: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: width
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: 'none',
    width: '90%',
    maxWidth: '500px',
    height: 'auto',
    padding: theme.spacing(2, 2, 4.5),
    borderRadius: '4px',
  },
  title: {
    textAlign: 'left',
    marginTop: '10px',
    marginBottom: '15px'
  },
  topDesc: {
    textAlign: 'left',
    fontFamily: 'Yekan',
    marginTop: '15px'
  },
  fontfamily: {
    fontFamily: 'Yekan'
  },
  TextField: {
    textAlign: 'right',
    direction: 'rtl'
  },
  input: {
    direction: 'rtl',
    textAlign: 'right',
    fontFamily: 'Yekan',
    fontSize: '13px'
  },
  switchpart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Yekan',
    marginTop: '20px',
    marginBottom: '25px',
  },
  switchLable: {
    marginRight: 0
  },
  select: {
    direction: 'rtl',
    textAlign: 'right',
    fontFamily: 'Yekan'
  },
  margin: {
    marginTop: '0px',
    marginBottom: '0px'
  },
  marginBottom: {
    marginBottom: '30px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function ListAddModal(props) {


  const [change, setchange] = React.useState({
    checkedB: false,
  });
  const handleChange = name => event => {
    setchange({ ...change, [name]: event.target.checked });
  };


  const inputLabelRef = React.useRef();
  const [age, setAge] = React.useState('');
  const [labelWidth] = React.useState(0);
  const handleChangeSelect = event => {
    setAge(event.target.value);
  };

  const classes = styles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.showAddModalOther}
        onClose={props.onHideAddModalOther}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.showAddModalOther}>
          <div className={classes.paper}>
            <h5 id="transition-modal-title" className={classes.title}>اضافه کردن</h5>
            <Divider id="transition-modal-divider" className={classes.marginBottom}/>
          <TextField fullWidth className={[classes.fontfamily, classes.TextFieldd].join(' ')}
            id="outlined-secondary"
            label="نام محصول"
            variant="outlined"
            color="secondary"
          />
            <FormControlLabel className={classes.switchpart}
              control={
                <Switch
                  checked={change.checkedB}
                  onChange={handleChange('checkedB')}
                  value="checkedB"
                  color="primary"
                />
              }
              label="تایید شده"
            />

      <FormControl fullWidth variant="outlined">
        <InputLabel className={classes.fontfamily} ref={inputLabelRef} id="demo-simple-select-outlined-label">
          دسته بندی
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChangeSelect}
          labelWidth={labelWidth}
        >
          <MenuItem value="موتور">موتور</MenuItem>
          <MenuItem value="ماشین">ماشین</MenuItem>
          <MenuItem value="موبایل">موبایل</MenuItem>
        </Select>
      </FormControl>

          </div>
        </Fade>
      </Modal>
    </div>
  );
}

const mapState = state => {
  return{
      showAddModal: state.list.showAddModal
  }
}

const mapDispatch = dispatch => {
  return{
      onHideAddModal: () => dispatch(mainListActionCreators.hideAddModal())
  }
}

export default connect(mapState, mapDispatch)(ListAddModal)