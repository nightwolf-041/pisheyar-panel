// this file is /list route Add modal ... its imported in PanelMain component and handle with its header 

import React from 'react';
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {Modal, Button, CircularProgress } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {TextField, Divider} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {FormControlLabel, Switch, Button, CircularProgress, TextField } from '@material-ui/core'

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
import Undo from '@ckeditor/ckeditor5-undo/src/undo';
import RemoveFormat from '@ckeditor/ckeditor5-remove-format/src/removeformat';
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
import SpecialCharacters from '@ckeditor/ckeditor5-special-characters/src/specialcharacters';
import SpecialCharactersCurrency from '@ckeditor/ckeditor5-special-characters/src/specialcharacterscurrency';
import SpecialCharactersMathematical from '@ckeditor/ckeditor5-special-characters/src/specialcharactersmathematical';
import BlockToolbar from '@ckeditor/ckeditor5-ui/src/toolbar/block/blocktoolbar';
import HeadingButtonsUI from '@ckeditor/ckeditor5-heading/src/headingbuttonsui';
import ParagraphButtonUI from '@ckeditor/ckeditor5-paragraph/src/paragraphbuttonui';
import Heading from '@ckeditor/ckeditor5-heading/src/heading';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import Indent from '@ckeditor/ckeditor5-indent/src/indent';
import IndentBlock from '@ckeditor/ckeditor5-indent/src/indentblock';
import Font from '@ckeditor/ckeditor5-font/src/font';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
import Link from '@ckeditor/ckeditor5-link/src/link';
import Image from '@ckeditor/ckeditor5-image/src/image';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle';
import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload';
import CKfinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder'
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import list from '@ckeditor/ckeditor5-list/src/list';
import Table from '@ckeditor/ckeditor5-table/src/table';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar';
import TableProperties from '@ckeditor/ckeditor5-table/src/tableproperties';
import TableCellProperties from '@ckeditor/ckeditor5-table/src/tablecellproperties';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
import Blockquote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
import Codeblock from '@ckeditor/ckeditor5-code-block/src/codeblock';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Clipboard from '@ckeditor/ckeditor5-clipboard/src/clipboard'
import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';


import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import classes from './categoriesInfoModal.module.css'
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
  width = '100%'
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
    width: width,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    boxShadow: 'none',
    width: '90%',
    maxWidth: '1000px',
    height: '95vh',
    padding: theme.spacing(2, 2, 2.5),
    borderRadius: '4px',
    margin: '0 auto',
    overflowX: 'hidden'
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
  marginTop1: {
    marginTop: 30
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
  infoAutoComplete: {
    marginTop: '1rem'
  },
  inputs: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  titleMarginTop: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  }
}));

function CategoriesInfoModal(props) {

  const [documentGuid, setDocumentGuid] = React.useState('');
  const [documentGuid2, setDocumentGuid2] = React.useState('');
  const [documentGuid3, setDocumentGuid3] = React.useState('');
  const [documentGuid4, setDocumentGuid4] = React.useState('');
  const [files, setFile] = React.useState([]);
  const [files2, setFile2] = React.useState([]);
  const [files3, setFile3] = React.useState([]);
  const [files4, setFile4] = React.useState([]);
  
  const [infoBoxDescription, setInfoBoxDescription] = React.useState('');
  const [loadingInfoBoxTags, setloadingInfoBoxTags] = React.useState(true);
  const [postInfoBoxTags, setPostInfoBoxTags] = React.useState([]);
  const [infoBoxTrimedValues, setInfoBoxTrimedValues] = React.useState();
  const [infoBoxReplacedValues, setInfoBoxReplacedValues] = React.useState();

  const [defaultInfoloading, setDefaultInfoloading] = React.useState(false);
  const [post, setPost] = React.useState({});
  const [fakeAutoOptions, setFakeAutoOptions] = React.useState(['']);



  let pond = React.useRef()
  let pond2 = React.useRef()
  let pond3 = React.useRef()
  let pond4 = React.useRef()

  React.useEffect(() => {
    axiosConfig.get('/Tag/GetAll', {
      headers: { Authorization: "Bearer " + props.token }
    }).then(res => {
      setloadingInfoBoxTags(false)
      setPostInfoBoxTags(res.data.tags)
    }).catch(err => {
      toast('خطا در بارگیری تگ های پست', {type: toast.TYPE.ERROR});
      setloadingInfoBoxTags(false)
      setPostInfoBoxTags([])
    })
  }, [props])


  const autoCompleteChangeHandler = (event, values) => {
    let SpacesRemovedArr = values.filter(str => /\S/.test(str))
    const newValues = SpacesRemovedArr.map(str => str.replace(/^\s+|\s+$|\s+(?=\s)/g, ""))
    .reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[])

    setInfoBoxTrimedValues(newValues, () => {
      let replacedTrimedValues = [...this.state.trimedValues]

      for (var obj in this.state.postTopTags) {
        let currentName = this.state.postTopTags[obj].name
        let currentId = this.state.postTopTags[obj].guid
        for (var val in replacedTrimedValues) {
          if(replacedTrimedValues[val] === currentName){
            replacedTrimedValues[val] = currentId
          }else{
            replacedTrimedValues[val] = replacedTrimedValues[val]
          }
        }
      }

      setInfoBoxReplacedValues(replacedTrimedValues)
    })

  }

  const infoBoxDescInputHandler = e => {
    let oldPost = {...this.state.post}
    let oldPostTitle = oldPost.postTitle
    oldPostTitle = e.target.value
    oldPost.postTitle = oldPostTitle

    setPost(oldPost)
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
            <h5 id="transition-modal-title" className={classes.title}>اضافه کردن</h5>
            <Divider id="transition-modal-divider" className={classes.marginBottom}/>
            <TextField fullWidth className={[classes.fontfamily, classes.TextField, classes.marginBottom2].join(' ')}
                id="ctgName"
                name='nodeName'
                label="نام گروه"
                variant="outlined"
                color="primary"
                error={props.errorOnAdd ? true : false}
                defaultValue={nameInputValue}
                helperText={props.errorOnAdd ? "الزامیست" : null}
                onChange={(e) => nameInputChangeHandler(e)}
            />
            <TextField fullWidth className={[classes.fontfamily, classes.TextField].join(' ')}
                id="ctgOrder"
                name='nodeName'
                label="ترتیب گروه"
                variant="outlined"
                color="primary"
                error={props.errorOnAdd ? true : false}
                defaultValue={orderInputValue}
                helperText={props.errorOnAdd ? "الزامیست" : null}
                onChange={(e) => orderInputChangeHandler(e)}
            />

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

const mapState = state => {
  return {
    token: state.authReducer.token
  }
}

export default connect(mapState)(CategoriesInfoModal);