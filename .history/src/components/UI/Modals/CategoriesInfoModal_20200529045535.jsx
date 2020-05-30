// this file is /list route Add modal ... its imported in PanelMain component and handle with its header 

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, Button, CircularProgress } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {TextField, Divider} from '@material-ui/core';

import './categoryAddModal.css'

registerPlugin(
    FilePondPluginImageExifOrientation,
    FilePondPluginImagePreview,
    FilePondPluginFileValidateSize,
    FilePondPluginImageValidateSize,
    FilePondPluginFileValidateType
);


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
    padding: theme.spacing(2, 2, 2.5),
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
  // TextFieldd: {

  // },
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
  marginBottom2: {
    marginBottom: '20px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
      width: '100%',
      marginTop: theme.spacing(2),
  },
  wrapper: {
    width: '100%',
    marginTop: theme.spacing(3),
    position: 'relative',
  },
  buttonSuccess: {
      width: '100%',
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
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

function CategoriesAddModal(props) {

  const [nameInputValue, setNameInputValue] = React.useState('');
  const [orderInputValue, setOrderInputValue] = React.useState('');

  React.useEffect(() => {
    if(props.removeInputsValue) {
        setNameInputValue('')
        setOrderInputValue('')
      }
  }, [props])


  console.log(nameInputValue);


  const nameInputChangeHandler = (e) => {
    setNameInputValue(e.target.value)
  }
  const orderInputChangeHandler = (e) => {
    setOrderInputValue(e.target.value)
  }

  const classes = styles();

  const customColorPalette = [
    {
        color: 'hsl(4, 90%, 58%)',
        label: 'قرمز'
    },
    {
        color: '#ffcdd2',
        label: 'قرمز روشن'
    },
    {
        color: 'hsl(340, 82%, 52%)',
        label: 'صورتی'
    },
    {
        color: '#F8BBD0',
        label: 'صورتی روشن'
    },
    {
        color: 'hsl(291, 64%, 42%)',
        label: 'بنفش'
    },
    {
        color: '#E1BEE7',
        label: 'بنفش روشن'
    },
    {
        color: '#00C853',
        label: 'سبز'
    },
    {
        color: '#C8E6C9',
        label: 'سبز روشن'
    },
    {
        color: '#B0BEC5',
        label: 'آبی-خاکستری'
    },
    {
        color: 'hsl(207, 90%, 54%)',
        label: 'آبی'
    },
    {
        color: '#BBDEFB',
        label: 'آبی روشن'
    },
    {
        color: '#ccc',
        label: 'خاکستری'
    },

];

  this.resToolbar = []

  if(window.innerWidth >= 992) {
    this.resToolbar=["bold", "horizontalline", "blockquote", "insertTable", '|',
    "heading", "alignment", '|', 'outdent', 'indent', '|', "highlight","fontcolor", "fontBackgroundColor", "fontsize", '|', "image",'bulletedList', 'numberedList', '|', "table", "imageupload", "mediaEmbed", "link" ]
  } 

  if(window.innerWidth < 992 && window.innerWidth >= 500){
    this.resToolbar=["undo", '|', "bold", "italic", "horizontalline", "blockquote", '|', "insertTable", '|', "heading", "alignment", '|', 'outdent', 'indent', '|', "highlight","fontcolor", "fontBackgroundColor", "fontsize", '|', "image",'bulletedList', 'numberedList', '|', "table", "imageupload", "link" ]
  }

  if(window.innerWidth < 500){
    this.resToolbar=["bold", "horizontalline", "blockquote", '|', "alignment", '|', "fontcolor", "fontBackgroundColor", "fontsize", '|', "image",'bulletedList', 'numberedList', '|', "imageupload", "link"]
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.showAddModal}
        onClose={props.hideAddModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.showAddModal}>
          <div className={classes.paper}>
            <h5 id="transition-modal-title" className={classes.title}>اطلاعات</h5>
            <Divider id="transition-modal-divider" className={classes.marginBottom}/>
           

            <div className={classes.wrapper}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.buttonSuccess}
                    disabled={props.buttonLoading}
                    onClick={() => props.handleButtonClick(nameInputValue, orderInputValue)}
                    >
                    ثبت
                </Button>
                {props.buttonLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>

          </div>
        </Fade>
      </Modal>
    </div>
  );
}


export default CategoriesAddModal;