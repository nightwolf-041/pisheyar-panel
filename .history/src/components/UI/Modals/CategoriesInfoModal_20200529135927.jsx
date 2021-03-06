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

import './categoriesInfoModal.module.css'

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
  width = 'calc(100% - 10px)'
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
    maxWidth: '1000px',
    height: 'auto',
    padding: theme.spacing(2, 2, 2.5),
    borderRadius: '4px',
    margin: '0 auto'
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
  infoAutoComplete: {
    marginTop: '1rem'
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

  const [loadingInfoBoxTags, setloadingInfoBoxTags] = React.useState(true);
  const [postInfoBoxTags, setPostInfoBoxTags] = React.useState([]);
  const [infoBoxTrimedValues, setInfoBoxTrimedValues] = React.useState();
  const [infoBoxReplacedValues, setInfoBoxReplacedValues] = React.useState();



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
    <>
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.showInfoModal}
        onClose={props.hideInfoModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.showInfoModal}>
        
          <div className={classes.paper}>
          <PerfectScrollbar>
            <h5 id="transition-modal-title" className={classes.title}>اطلاعات</h5>
            <Divider id="transition-modal-divider" className={classes.marginBottom}/>

              <div className={classes.infoBoxFilepondLabel}>
                عکس برای پروفایل اول
              </div>

              <FilePond ref={ref => pond = ref}
                files={files}
                allowMultiple={false}
                maxFiles={1}
                checkValidity={true}
                // allowFilePoster={false}
                allowFileSizeValidation={true}
                maxFileSize='1MB'
                labelMaxFileSizeExceeded="حجم فایل زیاد است"
                labelMaxFileSize="حداکثر حجم مجاز: {filesize}"
                allowImagePreview={true}
                imagePreviewMaxHeight={300}
                allowImageValidateSize={true}
                imageValidateSizeMinWidth={300}
                imageValidateSizeMaxWidth={750}
                imageValidateSizeMinHeight={300}
                imageValidateSizeMaxHeight={750}
                imageValidateSizeLabelFormatError="نوع عکس مجاز نیست"
                imageValidateSizeLabelImageSizeTooSmall="عکس بسیار کوچک است"
                imageValidateSizeLabelImageSizeTooBig="عکس بسیار بزرگ است"
                imageValidateSizeLabelExpectedMinSize="حداقل سایز عکس: {minWidth} × {minHeight}"
                imageValidateSizeLabelExpectedMaxSize="حداکثر سایز عکس: {maxWidth} × {maxHeight}"
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/png', 'image/jpg', 'image/jpeg']}
                labelFileTypeNotAllowed="فایل انتخابی مجاز نیست"
                server = {{
                  url: 'http://185.94.97.164/api/Uploader',
                  process: '/FilepondProcess',
                  revert: {
                    url: '/FilepondRevert',
                    method: 'POST'
                  }
                }}
                onprocessfile={(error, file) => setDocumentGuid(file.serverId)}
                onupdatefiles={(fileItems) => {
                    setFile(fileItems.map(fileItem => fileItem.file))
                }}
                labelIdle="عکس را اینجا رها یا کلیک کنید"
                labelInvalidField="فایل معنبر نیست"
                labelFileProcessing="درحال بارگذاری"
                labelFileProcessingError="خطا در بارگذاری"
                labelFileLoading="درحال بارگیری"
                labelFileLoadError="خطا در بارگیری"
                labelFileProcessingComplete="بارگذاری موفق"
                labelFileProcessingAborted="لغو بارگذاری"
                labelFileProcessingRevertError="خطا در بازگشتن"
                labelFileRemoveError="خطا در حذف"

                labelTapToCancel="لغو"
                labelTapToRetry="تلاش مجدد"
                labelTapToUndo="بازگردانی"
                labelButtonRemoveItem="حذف"
                labelButtonRetryItemLoad="تلاش مجدد"
                labelButtonAbortItemProcessing="لغو"
                labelButtonUndoItemProcessing="بازنشانی"
                labelButtonRetryItemProcessing="تلاش مجدد"
                labelButtonProcessItem="بارگذاری"
                >
              </FilePond>

              <div className={classes.infoBoxFilepondLabel}>
                عکس برای پروفایل اول
              </div>

              <FilePond ref={ref => pond2 = ref}
                files={files2}
                allowMultiple={false}
                maxFiles={1}
                checkValidity={true}
                // allowFilePoster={false}
                allowFileSizeValidation={true}
                maxFileSize='1MB'
                labelMaxFileSizeExceeded="حجم فایل زیاد است"
                labelMaxFileSize="حداکثر حجم مجاز: {filesize}"
                allowImagePreview={true}
                imagePreviewMaxHeight={300}
                allowImageValidateSize={true}
                imageValidateSizeMinWidth={300}
                imageValidateSizeMaxWidth={750}
                imageValidateSizeMinHeight={300}
                imageValidateSizeMaxHeight={750}
                imageValidateSizeLabelFormatError="نوع عکس مجاز نیست"
                imageValidateSizeLabelImageSizeTooSmall="عکس بسیار کوچک است"
                imageValidateSizeLabelImageSizeTooBig="عکس بسیار بزرگ است"
                imageValidateSizeLabelExpectedMinSize="حداقل سایز عکس: {minWidth} × {minHeight}"
                imageValidateSizeLabelExpectedMaxSize="حداکثر سایز عکس: {maxWidth} × {maxHeight}"
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/png', 'image/jpg', 'image/jpeg']}
                labelFileTypeNotAllowed="فایل انتخابی مجاز نیست"
                server = {{
                  url: 'http://185.94.97.164/api/Uploader',
                  process: '/FilepondProcess',
                  revert: {
                    url: '/FilepondRevert',
                    method: 'POST'
                  }
                }}
               onprocessfile={(error, file) => setDocumentGuid2(file.serverId)}
                onupdatefiles={(fileItems) => {
                    setFile2(fileItems.map(fileItem => fileItem.file))
                }}
                labelIdle="عکس را اینجا رها یا کلیک کنید"
                labelInvalidField="فایل معنبر نیست"
                labelFileProcessing="درحال بارگذاری"
                labelFileProcessingError="خطا در بارگذاری"
                labelFileLoading="درحال بارگیری"
                labelFileLoadError="خطا در بارگیری"
                labelFileProcessingComplete="بارگذاری موفق"
                labelFileProcessingAborted="لغو بارگذاری"
                labelFileProcessingRevertError="خطا در بازگشتن"
                labelFileRemoveError="خطا در حذف"

                labelTapToCancel="لغو"
                labelTapToRetry="تلاش مجدد"
                labelTapToUndo="بازگردانی"
                labelButtonRemoveItem="حذف"
                labelButtonRetryItemLoad="تلاش مجدد"
                labelButtonAbortItemProcessing="لغو"
                labelButtonUndoItemProcessing="بازنشانی"
                labelButtonRetryItemProcessing="تلاش مجدد"
                labelButtonProcessItem="بارگذاری"
                >
              </FilePond>

              <div className={classes.infoBoxFilepondLabel}>
                عکس برای پروفایل اول
              </div>

              <FilePond ref={ref => pond3 = ref}
                files={files3}
                allowMultiple={false}
                maxFiles={1}
                checkValidity={true}
                // allowFilePoster={false}
                allowFileSizeValidation={true}
                maxFileSize='1MB'
                labelMaxFileSizeExceeded="حجم فایل زیاد است"
                labelMaxFileSize="حداکثر حجم مجاز: {filesize}"
                allowImagePreview={true}
                imagePreviewMaxHeight={300}
                allowImageValidateSize={true}
                imageValidateSizeMinWidth={300}
                imageValidateSizeMaxWidth={750}
                imageValidateSizeMinHeight={300}
                imageValidateSizeMaxHeight={750}
                imageValidateSizeLabelFormatError="نوع عکس مجاز نیست"
                imageValidateSizeLabelImageSizeTooSmall="عکس بسیار کوچک است"
                imageValidateSizeLabelImageSizeTooBig="عکس بسیار بزرگ است"
                imageValidateSizeLabelExpectedMinSize="حداقل سایز عکس: {minWidth} × {minHeight}"
                imageValidateSizeLabelExpectedMaxSize="حداکثر سایز عکس: {maxWidth} × {maxHeight}"
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/png', 'image/jpg', 'image/jpeg']}
                labelFileTypeNotAllowed="فایل انتخابی مجاز نیست"
                server = {{
                  url: 'http://185.94.97.164/api/Uploader',
                  process: '/FilepondProcess',
                  revert: {
                    url: '/FilepondRevert',
                    method: 'POST'
                  }
                }}
               onprocessfile={(error, file) => setDocumentGuid3(file.serverId)}
                onupdatefiles={(fileItems) => {
                    setFile3(fileItems.map(fileItem => fileItem.file))
                }}
                labelIdle="عکس را اینجا رها یا کلیک کنید"
                labelInvalidField="فایل معنبر نیست"
                labelFileProcessing="درحال بارگذاری"
                labelFileProcessingError="خطا در بارگذاری"
                labelFileLoading="درحال بارگیری"
                labelFileLoadError="خطا در بارگیری"
                labelFileProcessingComplete="بارگذاری موفق"
                labelFileProcessingAborted="لغو بارگذاری"
                labelFileProcessingRevertError="خطا در بازگشتن"
                labelFileRemoveError="خطا در حذف"

                labelTapToCancel="لغو"
                labelTapToRetry="تلاش مجدد"
                labelTapToUndo="بازگردانی"
                labelButtonRemoveItem="حذف"
                labelButtonRetryItemLoad="تلاش مجدد"
                labelButtonAbortItemProcessing="لغو"
                labelButtonUndoItemProcessing="بازنشانی"
                labelButtonRetryItemProcessing="تلاش مجدد"
                labelButtonProcessItem="بارگذاری"
                >
              </FilePond>

              <div className={classes.infoBoxFilepondLabel}>
                عکس برای پروفایل اول
              </div>

              <FilePond ref={ref => pond4 = ref}
                files={files4}
                allowMultiple={false}
                maxFiles={1}
                checkValidity={true}
                // allowFilePoster={false}
                allowFileSizeValidation={true}
                maxFileSize='1MB'
                labelMaxFileSizeExceeded="حجم فایل زیاد است"
                labelMaxFileSize="حداکثر حجم مجاز: {filesize}"
                allowImagePreview={true}
                imagePreviewMaxHeight={300}
                allowImageValidateSize={true}
                imageValidateSizeMinWidth={300}
                imageValidateSizeMaxWidth={750}
                imageValidateSizeMinHeight={300}
                imageValidateSizeMaxHeight={750}
                imageValidateSizeLabelFormatError="نوع عکس مجاز نیست"
                imageValidateSizeLabelImageSizeTooSmall="عکس بسیار کوچک است"
                imageValidateSizeLabelImageSizeTooBig="عکس بسیار بزرگ است"
                imageValidateSizeLabelExpectedMinSize="حداقل سایز عکس: {minWidth} × {minHeight}"
                imageValidateSizeLabelExpectedMaxSize="حداکثر سایز عکس: {maxWidth} × {maxHeight}"
                allowFileTypeValidation={true}
                acceptedFileTypes={['image/png', 'image/jpg', 'image/jpeg']}
                labelFileTypeNotAllowed="فایل انتخابی مجاز نیست"
                server = {{
                  url: 'http://185.94.97.164/api/Uploader',
                  process: '/FilepondProcess',
                  revert: {
                    url: '/FilepondRevert',
                    method: 'POST'
                  }
                }}
               onprocessfile={(error, file) => setDocumentGuid4(file.serverId)}
                onupdatefiles={(fileItems) => {
                    setFile4(fileItems.map(fileItem => fileItem.file))
                }}
                labelIdle="عکس را اینجا رها یا کلیک کنید"
                labelInvalidField="فایل معنبر نیست"
                labelFileProcessing="درحال بارگذاری"
                labelFileProcessingError="خطا در بارگذاری"
                labelFileLoading="درحال بارگیری"
                labelFileLoadError="خطا در بارگیری"
                labelFileProcessingComplete="بارگذاری موفق"
                labelFileProcessingAborted="لغو بارگذاری"
                labelFileProcessingRevertError="خطا در بازگشتن"
                labelFileRemoveError="خطا در حذف"

                labelTapToCancel="لغو"
                labelTapToRetry="تلاش مجدد"
                labelTapToUndo="بازگردانی"
                labelButtonRemoveItem="حذف"
                labelButtonRetryItemLoad="تلاش مجدد"
                labelButtonAbortItemProcessing="لغو"
                labelButtonUndoItemProcessing="بازنشانی"
                labelButtonRetryItemProcessing="تلاش مجدد"
                labelButtonProcessItem="بارگذاری"
                >
              </FilePond>

              {/* <div className={classes.infoBoxFilepondLabel}>
                توضیحات برای دسته بندی
              </div> */}

              <CKEditor
                // style={{marginTop: '1rem', marginBottom: '1rem'}}
                editor={ClassicEditor}
                config={
              
              {
                plugins: [Undo, RemoveFormat, Essentials, Bold, Italic, Underline, ParagraphButtonUI, HeadingButtonsUI, HorizontalLine, Paragraph, Blockquote,  SpecialCharacters, SpecialCharactersCurrency, SpecialCharactersMathematical,
                Heading, Alignment, Indent, IndentBlock, PasteFromOffice, Highlight, Font, FontSize, list, Table, TableToolbar, TableProperties, TableCellProperties, Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, ImageUpload, Link , EasyImage, SimpleUploadAdapter, MediaEmbed, Clipboard ],
                
                  toolbar: ["bold", "horizontalline", "blockquote", "insertTable", '|',
                  "heading", "alignment", '|', 'outdent', 'indent', '|', "highlight","fontcolor", "fontBackgroundColor", "fontsize", '|', "image",'bulletedList', 'numberedList', '|', "table", "imageupload", "mediaEmbed", "link" ],

                  image: {
                    label: 'عکس',
                    toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight' ],
                    styles: [
                      'full',
                      'alignLeft',
                      'alignRight'
                    ]
                  },

                  highlight: {
                    options: [
                        {
                            model: 'greenMarker',
                            class: 'marker-green',
                            title: 'نشانگر سبز',
                            color: 'rgba(116, 226, 122, 0.459)',
                            type: 'marker'
                        },
                        {
                            model: 'redMarker',
                            class: 'marker-red',
                            title: 'نشانگر قرمز',
                            color: '#f7534775',
                            type: 'marker'
                        },
                        {
                            model: 'yellowMarker',
                            class: 'marker-yellow',
                            title: 'نشانگر زرد',
                            color: 'rgba(255, 233, 36, 0.459)',
                            type: 'marker'
                        },
                        {
                            model: 'blueMarker',
                            class: 'marker-blue',
                            title: 'نشانگر آبی',
                            color: "#BBDEFB",
                            type: 'marker'
                        },
                        {
                            model: 'greyMarker',
                            class: 'marker-grey',
                            title: 'نشانگر خاکستری',
                            color: "rgba(204, 204, 204, 0.726)",
                            type: 'marker'
                        },
                    ]
                },

                  heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                    ]
                  },

                  fontSize: {
                    options: [
                      'tiny',
                      'small',
                      'big',
                      'default',
                      14,
                      19
                    ]
                },

                  fontColor: {
                    colors: [
                        {
                            color: 'hsl(0, 0%, 0%)',
                            label: 'مشکی'
                        },
                        {
                            color: 'hsl(0, 0%, 30%)',
                            label: 'خاکستری تیره'
                        },
                        {
                          color: '#868e96 ',
                          label: 'خاکستری BS'
                        },
                        {
                            color: 'hsl(0, 0%, 60%)',
                            label: 'خاکستری'
                        },
                        {
                            color: 'hsl(0, 0%, 90%)',
                            label: 'خاکستری روشن'
                        },
                        {
                            color: 'hsl(0, 0%, 100%)',
                            label: 'سفید',
                            hasBorder: true
                        },
                        {
                          color: '#f44336',
                          label: 'قرمز'
                        },
                        {
                          color: '#03A9F4',
                          label: 'آبی'
                        },
                        {
                          color: '#4CAF50',
                          label: 'سبز'
                        },
                        {
                          color: '#FFEB3B',
                          label: 'زرد'
                        },
                    ],
                    columns: 5
                },

                fontBackgroundColor: {
                    colors: [
                        {
                            color: '#0275d8',
                            label: 'اقدامات'
                        },
                        {
                            color: '#5cb85c',
                            label: 'موفقیت'
                        },
                        {
                            color: '#5bc0de',
                            label: 'اطلاعات'
                        },
                        {
                            color: '#ffc107 ',
                            label: 'هشدار'
                        },
                        {
                            color: '#d9534f',
                            label: 'اخطار'
                        },
                        {
                            color: '#292b2c',
                            label: 'معکوس'
                        },
                        {
                          color: 'hsl(0, 0%, 30%)',
                          label: 'خاکستری تیره'
                        },
                        {
                            color: '#868e96',
                            label: 'خاکستری BS'
                        },
                    ],
                    columns: 4
                },

                table: {
                  contentToolbar: [
                      'tableColumn', 'tableRow', 'mergeTableCells',
                      'tableProperties', 'tableCellProperties'
                  ],
      
                  tableProperties: {
                      borderColors: customColorPalette,
                      backgroundColors: customColorPalette
                  },
      
                  tableCellProperties: {
                      borderColors: customColorPalette,
                      backgroundColors: customColorPalette
                  }
                },


                  language: {
                    ui: 'fa',
        
                    content: 'fa'
                  },
                  placeholder: 'پست خود را ایجاد کنید',

                  simpleUpload: {
                    uploadUrl: 'http://185.94.97.164/api/Uploader/CKEditor',
                    headers: {
                      'X-CSRF-TOKEN': 'CSFR-Token',
                      Authorization: 'Bearer <JSON Web Token>'
                      // Authorization: "Bearer " + this.props.token
                    }
                  }
              }
            }
            // onChange={(event, editor) => {
            //   const data = editor.getData();
            //   this.setState({description: data})
            // }}
            
          />

            <Autocomplete
              multiple
              className={styles.infoAutoComplete}
              id="tags-filled-info"
              loading={loadingInfoBoxTags}
              loadingText="درحال بارگیری"
              noOptionsText="موردی یافت نشد"
              options={postInfoBoxTags.map((option) => option.name)}
              freeSolo
              onChange={(event, values) => {
                autoCompleteChangeHandler(event, values)
              }}
              renderTags={(value, getTagProps) =>
                infoBoxTrimedValues.map((option, index) => (
                  <Chip 
                  label={option}
                  {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => (
                <TextField style={{direction: 'rtl'}} {...params}
                variant="outlined"
                label={loadingInfoBoxTags ? 'درحال بارگیری...' : 'تگ های پست' }
                placeholder="انتخاب یا تایپ کنید"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loadingInfoBoxTags ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
                />
              )}
            />

            <div className={classes.wrapper}>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.buttonSuccess}
                    disabled={props.buttonLoading}
                    // onClick={() => props.handleButtonClick(nameInputValue, orderInputValue)}
                    >
                    ارسال
                </Button>
                {props.buttonLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>

            </PerfectScrollbar>

          </div>
        </Fade>
      </Modal>
    </div>

    <ToastContainer autoClose={4000}
    position={toast.POSITION.BOTTOM_LEFT}
    hideProgressBar={false}
    closeOnClick={true}
    pauseOnVisibilityChange={false}
    pauseOnHover={false}
    rtl={true} />
    </>
  );
}

const mapState = state => {
  return {
    token: state.authReducer.token
  }
}

export default connect(mapState)(CategoriesInfoModal);