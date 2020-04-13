
// import React from 'react';
// import {connect} from 'react-redux'
// import {withRouter} from 'react-router-dom'
// import PanelMainPostCreatehead from '../../panelMain/panelMainHeads/PanelMainPostCreatehead'
// import PanelMain from '../../panelMain/PanelMain'
// import axiosConfig from '../../../axiosConfigure/axiosConfig'
// import { Editor } from '@tinymce/tinymce-react';
// import {FormControlLabel, Switch} from '@material-ui/core'
// import { ToastContainer, toast } from 'react-toastify';

// import 'react-toastify/dist/ReactToastify.css';
// import './postCreate.css'


//  class PostCreate extends React.Component {
//    constructor(props) {
//      super(props)
//      this.state = {

//       loaded: false,

//       loading: true,
//       errorMsg: null,

//       preLoader: true,
//       checked: false,

//       title: '',
//       abstract: '',
//       description: ''
//      }

//    }

//    errorOnSending = () => toast(this.state.errorMsg, {type: toast.TYPE.ERROR});
//    errorOnCatch = () => toast('خطای شبکه', {type: toast.TYPE.ERROR});
//    successOnSending = () => toast(this.state.errorMsg, {type: toast.TYPE.SUCCESS});


//    titleInputHandler = (e) => {
//     this.setState( {title: e.target.value})
//    }

//    handleEditorChangeTop = (content, editor) => {
//      this.setState( {abstract: content})
//    }

//    handleEditorChangeBott = (content, editor) => {
//      this.setState( {description: content})
//    }

//    toggleChecked = () => {
//      let oldchecked = this.state.checked
//      this.setState({checked: !oldchecked})
//    }


//    sendDataHandler = () => {
//      let titleValue = this.state.title
//      let abstractValue = this.state.abstract
//      let descriptionValue = this.state.description
//      let checkValue = this.state.checked

//      this.setState({
//       loading: true,
//     })

//      axiosConfig.post('/Post/Create', {
//       title: titleValue,
//       abstract: abstractValue,
//       description: descriptionValue,
//       isShow: checkValue,
//       categoriesIds: [2,3]
//      }, {
//       headers: { Authorization: "Bearer " + this.props.token }
//     }).then(res => {

//       this.setState({
//         loading: false,
//         errorMsg: res.data.message
//       })

//       this.successOnSending()

//     }).catch(err => {

//       this.setState({
//         loading: false,
//         errorMsg: err.message
//       })

//       this.errorOnCatch()
//     })
//    }


   
//    render() {
//      return (
//        <PanelMain header={<PanelMainPostCreatehead />}>
//           {!this.state.loaded ? 
//             <div className="d-flex justify-content-center">
//               <div className="spinner-border d-block mr-2" role="status">
//                 <span className="sr-only">Loading...</span>
//               </div>
//               <strong className="d-block">در حال بارگیری</strong>
//             </div>
//             : null
//           }

//             {this.state.loaded ? 
//               <h5 className="text-right text-secondary mt-3 mb-3">
//                 عنوان پست خود را بنویسید
//               </h5>
//               : null
//             }


//           {this.state.loaded ? 
//             <input className="form-control top-input" defaultValue={this.state.title}
//             onChange={(e) => this.titleInputHandler(e)} />
//             : null
//           }


//             {this.state.loaded ? 
//               <h5 className="text-right text-secondary mt-5 mb-3">
//                 توضیح مختصر پست خود را بنویسید
//               </h5>
//               :null 
//             }
          
//             <div style={{position: 'relative'}}>
//               <Editor
//               apiKey='s5t2laxkqiazmks1pfjhbhqayi9b8k2103yyp4fuzvodb6cq'
//               cloudChannel='5-dev'
//               initialValue=""
//               outputFormat='html'
//               init = {{
//                 // selector: 'textarea',
//                 file_picker_types: 'image',
//                 plugins: ['advlist autolink lists link image imagetools charmap print preview anchor',
//                   'searchreplace visualblocks code',
//                   'insertdatetime media table paste code blockquote help wordcount directionality hr casechange hr formatpainter',
//                   'save '],
//                 mobile: {
//                   plugins: 'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars image link media mediaembed template codesample charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern help formatpainter pageembed charmap mentions quickbars linkchecker emoticons',
//                 },
//                 // menubar: 'file edit view insert format tools table tc help',
//                 toolbar: ['undo redo | fontselect  formatselect fontsizeselect | bold italic | strikethrough | backcolor forecolor permanentpen | \
//                 alignleft aligncenter alignright alignjustify \
//                 bullist numlist | outdent indent | blockquote | subscript superscript | removeformat | help | image | link | \
//                 insertdatetime | table | ltr rtl | save | casechange \
//                 hr | formatpainter '],
//                 content_css: '//www.tiny.cloud/css/codepen.min.css',
//                 image_class_list: [
//                   { title: 'None', value: '' },
//                   { title: 'وسط چین', value: 'class-name' }
//                 ],
//                 height: 400,
//                 branding: false,
//                 fixed_toolbar_container: '#mytoolbar',
//                 a11y_advanced_options: true,
//                 image_title: true,
//                 image_caption: true,
//                 image_description: true,
//                 image_uploadtab: true,
//                 images_upload_url: 'postAcceptor.php',
//                 // automatic_uploads: false,
//                 images_upload_handler: function (blobInfo, success, failure) {
//                   var xhr, formData;
              
//                   xhr = new XMLHttpRequest();
//                   xhr.withCredentials = false;
//                   xhr.open('POST', 'postAcceptor.php');
              
//                   xhr.onload = function() {
//                     var json;
              
//                     if (xhr.status != 200) {
//                       failure('خطا: ' + xhr.status);
//                       return;
//                     }
              
//                     json = JSON.parse(xhr.responseText);
              
//                     if (!json || typeof json.location != 'string') {
//                       failure('Invalid JSON: ' + xhr.responseText);
//                       return;
//                     }
              
//                     success(json.location);
//                   };
              
//                   formData = new FormData();
//                   formData.append('file', blobInfo.blob(), blobInfo.filename());
              
//                   xhr.send(formData);
//                 },
//                 style_formats: [
//                   {title: 'Image Left', selector: 'img', styles: {
//                     'float' : 'left',
//                     'margin': '0 10px 0 10px'
//                   }},
//                   {title: 'Image Right', selector: 'img', styles: {
//                     'float' : 'right',
//                     'margin': '0 10px 0 10px'
//                   }}
//                 ],
//                 menu: {
//                   file: { title: 'File', items: 'newdocument restoredraft | preview | print ' },
//                   edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
//                   view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
//                   insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
//                   format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat' },
//                   tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
//                   table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
//                   help: { title: 'Help', items: 'help' }
//                 },
              
//                 setup: (editor) => {
//                   editor.on("init", () => {
//                     console.log('initialized')
//                   {
//                     this.setState({loaded: true, loading: false})
//                   }
//                   })
//                 }
                
              
//                }}
//               onEditorChange={this.handleEditorChangeTop}
//             />
//             </div>

//             {this.state.loaded ? 
//               <h5 className="text-right text-secondary mt-5 mb-3">
//                 محتویات پست خود را بنویسید
//               </h5>
//               : null 
//             }

//             <Editor
//               // apiKey='s5t2laxkqiazmks1pfjhbhqayi9b8k2103yyp4fuzvodb6cq'
//               initialValue=""
//               outputFormat='html'
//               init={{
//                 height: 300,
//                 menubar: false,
//                 plugins: [
//                   'advlist autolink lists link image charmap print preview anchor',
//                   'searchreplace visualblocks code fullscreen',
//                   'insertdatetime media table paste code help wordcount directionality hr fullscreen casechange hr formatpainter ',
//                   'save '
//                 ],
//                 toolbar:
//                   'undo redo | fontselect  formatselect fontsizeselect | bold italic strikethrough | backcolor forecolor permanentpen \
//                   alignleft aligncenter alignright alignjustify | \
//                   bullist numlist outdent indent | removeformat | help | image | link \
//                   insertdatetime | table | ltr rtl | fullscreen | save | casechange \
//                   hr | formatpainter ',

//                   setup: (editor) => {
//                   editor.on("init", () => {
//                     console.log('initialized')
//                   {
//                     this.setState({loaded: true, loading: false})
//                   }
//                   })
//                 }

//               }}
//               onEditorChange={this.handleEditorChangeBott}
//             />

//             {this.state.loaded ? 
//               <FormControlLabel
//                   control={<Switch checked={this.state.checked} onChange={this.toggleChecked} />}
//                   label="قابلیت نمایش"
//                 />
//                 : null
//             }

//             <button className="btn btn-block btn-primary tiny-send-button"
//             disabled={this.state.loading}
//             onClick={this.sendDataHandler}>
//               {this.state.loading ? 'صبور باشید'
//                 : 'ارسال'
//               }
//             </button>

//             <ToastContainer autoClose={4000}
//                 position={toast.POSITION.BOTTOM_LEFT}
//                 hideProgressBar={false}
//                 closeOnClick={true}
//                 pauseOnVisibilityChange={false}
//                 pauseOnHover={false}
//                 rtl={true} />
//        </PanelMain>
//      );
//    }
//  }

//  const mapState = state => {
//    return {
//      token: state.authReducer.token
//    }
//  }

//  export default connect(mapState)(withRouter(PostCreate));


import React, { Component } from "react";
import PanelMainPostCreatehead from '../../panelMain/panelMainHeads/PanelMainPostCreatehead'
import PanelMain from '../../panelMain/PanelMain'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import {FormControlLabel, Switch, Button, CircularProgress, TextField } from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
// import '../../../../node_modules/react-filepond/';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { Tooltip} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowMaximize, faWindowMinimize } from '@fortawesome/free-solid-svg-icons'

import './postCreate.css'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);


const styles = theme => ({
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
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  inputs: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  marginButtom: {
    marginBottom: theme.spacing(3),
  },
  marginTop: {
    marginTop: theme.spacing(3),
  },
  autoComplete: {
    direction: 'rtl'
  }
});


class PostCreate extends Component {

  constructor(props) {
    super(props);

    this.state = {
      files: [],
      documentGuid: '',

      title: '',
      abstract: '',
      description: '',

      maximaizing: false,

      loading: false,
      errorMsg: null,

      checked: false,

      loadingPostTags: true,
      postTopTags: [],
      trimedValues: '',
      replacedValues: '',

      categoriesNames: [],
      loadingCategoriesNames: true,
      selectedCategoryName: ''
    }
  }

  handleInit() {
    console.log('FilePond instance has initialised', this.pond);
}

  errorOnSending = () => toast(this.state.errorMsg, {type: toast.TYPE.ERROR});
  errorOnCatch = () => toast('خطای شبکه', {type: toast.TYPE.ERROR});
  successOnSending = () => toast(this.state.errorMsg, {type: toast.TYPE.SUCCESS});


  titleInputHandler = (e) => {
   this.setState( {title: e.target.value})
  }
  abstractInputHandler = (e) => {
   this.setState( {abstract: e.target.value})
  }

  toggleChecked = () => {
    let oldchecked = this.state.checked
    this.setState({checked: !oldchecked})
  }

  windowMaximizer = () => {
    this.setState({maximaizing: true})
  }

  windowMinimizer = () => {
    this.setState({maximaizing: false})
  }


  componentDidMount() {
    this.setState({
      loadingPostTags: true,
      loadingCategoriesNames: true
    })

    axiosConfig.get('/Tag/GetAll', {
      headers: { Authorization: "Bearer " + this.props.token }
    }).then(res => {
      this.setState({
        postTopTags: res.data.tags,
        loadingPostTags: false
      })
    }).catch(err => {
      toast('خطا در بارگیری تگ های پست', {type: toast.TYPE.ERROR});
      this.setState({
        postTopTags: [],
        loadingPostTags: false
      })
    })

    axiosConfig.get('/Category/GetAllNames', {
      headers: { Authorization: "Bearer " + this.props.token }
    }).then(res => {
      console.log(res.data.categories);
      this.setState({
        categoriesNames: res.data.categories,
        loadingCategoriesNames: false
      })
    }).catch(err => {
      toast('خطا در بارگیری لیست دسته بندی ها', {type: toast.TYPE.ERROR});
      this.setState({
        categoriesNames: [],
        loadingCategoriesNames: false
      })
    })
  }

  autoCompleteChangeHandler = (event, values) => {

    let SpacesRemovedArr = values.filter(str => /\S/.test(str))

    const newValues = SpacesRemovedArr.map(str => str.replace(/^\s+|\s+$|\s+(?=\s)/g, ""))
    .reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[])

    this.setState({trimedValues: newValues} , () => { 

    let replacedTrimedValues = [...this.state.trimedValues]

    for (var obj in this.state.postTopTags) {

      let currentName = this.state.postTopTags[obj].tagName
      let currentId = this.state.postTopTags[obj].tagGuid

      for (var val in replacedTrimedValues) {
        if(replacedTrimedValues[val] === currentName){
          replacedTrimedValues[val] = currentId
        }else{
          replacedTrimedValues[val] = replacedTrimedValues[val]
        }
      }
    }

    this.setState({replacedValues: replacedTrimedValues})
    })
  }

  categoriesNamesAutoChangeHanlder =(event, value) => {
    console.log(value);

    for (var obj in this.state.categoriesNames) {

      let ctgName = this.state.categoriesNames[obj].title
      let ctgId = this.state.categoriesNames[obj].guid

      if(value === ctgName){
        value = ctgId
      }else{
        value = value
      }
    }
    let finalValue = value.split(' ')
    console.log(finalValue);

    // this.state.categoriesNames.map(ctg => value === ctg.title ? value = ctg.guid : value = value)
    this.setState({selectedCategoryName: finalValue})
  }

  sendDataHandler = () => {

    let docGuid = this.state.documentGuid.replace(/['"]+/g, '')
    let postImage = this.state.files

    let titleValue = this.state.title
    let abstractValue = this.state.abstract
    let descriptionValue = this.state.description
    let checkValue = this.state.checked 

    let postTags = this.state.replacedValues
    let categoryName = this.state.selectedCategoryName

    let data = {
      docGuid,
      titleValue,
      abstractValue,
      descriptionValue,
      checkValue,
      postTags,
      categoryName
    }

    // console.log(data);
    console.log(this.state.documentGuid.replace(/['"]+/g, ''));

    if(postImage.length === 0 || titleValue.length === 0 || abstractValue.length === 0 ||   descriptionValue.length === 0 || postTags.length === 0 || categoryName.length === 0) {
      toast('لطفا ورودی ها را پر کنید', {type: toast.TYPE.WARNING});
    }else{

    this.setState({
      loading: true,
    })

    console.log(this.state.documentGuid.replace(/['"]+/g, ''));

    // documentGuid: this.state.documentGuid.replace(/['"]+/g, ''),
    // title: this.state.title,
    // abstract: this.state.abstract,
    // description: this.state.description,
    // isShow: this.state.checked,
    // tags: this.state.replacedValues,
    // categories: this.state.selectedCategoryName

    axiosConfig.post('/Post/Create', {
      documentGuid: docGuid,
      title: titleValue,
      abstract: abstractValue,
      description: descriptionValue,
      isShow: checkValue,
      tags: postTags,
      categories: categoryName
    }, {
      headers: { Authorization: "Bearer " + this.props.token }
    }).then(res => {

      this.setState({
        loading: false,
        errorMsg: res.data.message
      })

      this.successOnSending()

    }).catch(err => {

      this.setState({
        loading: false,
        errorMsg: err.message
      })

      this.errorOnCatch()
    })
  }
}


  render() {

    console.log(this.state.files);

    const {classes} = this.props;

    const useStylesBootstrap = makeStyles(theme => ({
      arrow: {
        color: theme.palette.common.black,
      },
      tooltip: {
        backgroundColor: theme.palette.common.black,
        fontFamily: 'Yekan'
      },
    }));
    
  
    function BootstrapTooltip(props) {
      const classe = useStylesBootstrap();
      return <Tooltip arrow classes={classe} {...props} />;
    }


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
    this.resToolbar=["undo", "redo", "removeFormat", '|', "bold", "italic", "underline", "horizontalline", "blockquote", '|', "insertTable", "specialCharacters", '|', "heading", "alignment", '|', 'outdent', 'indent', '|', "highlight","fontcolor", "fontBackgroundColor", "fontsize", '|', "image",'bulletedList', 'numberedList', '|', "table", "imageupload", "mediaEmbed", "link" ]
  } 

  if(window.innerWidth < 992 && window.innerWidth >= 500){
    this.resToolbar=["undo", '|', "bold", "italic", "horizontalline", "blockquote", '|', "insertTable", '|', "heading", "alignment", '|', 'outdent', 'indent', '|', "highlight","fontcolor", "fontBackgroundColor", "fontsize", '|', "image",'bulletedList', 'numberedList', '|', "table", "imageupload", "link" ]
  }

  if(window.innerWidth < 500){
    this.resToolbar=["bold", "horizontalline", "blockquote", '|', "alignment", '|', "fontcolor", "fontBackgroundColor", "fontsize", '|', "image",'bulletedList', 'numberedList', '|', "imageupload", "link"]
  }


    return (
      <PanelMain header={<PanelMainPostCreatehead />}>

        <FilePond ref={ref => this.pond = ref}
          files={this.state.files}
          allowMultiple={false}
          checkValidity={true}
          // instantUpload={false}
          maxFiles={1}
          // server="http://185.94.97.164/api/CKEditor/UploadImageTest"
          server = {{
            url: 'http://185.94.97.164/api/Uploader',
            process: '/FilepondProcess',
            // revert: '/RevertImage',
            revert: {
              url: '/FilepondRevert',
              method: 'POST'
            }
            
            // restore: './restore.php?id=',
            // fetch: './fetch.php?data='
          }}
          // server={{
          //   url: 'http://185.94.97.164/',
          //   process: './api/CKEditor/UploadImage'
          // }}
          oninit={() => this.handleInit() }

          // onremovefile={(error, file) => console.log(file)}
          onprocessfile={(error, file) => this.setState({documentGuid: file.serverId})}
          // onprocessfilerevert={(file) => console.log(file)}

          onupdatefiles={(fileItems) => {
              this.setState({
                  files: fileItems.map(fileItem => fileItem.file)
              });
          }}
          // onaddfilestart={(file) => console.log(file)}
          // onaddfileprogress={(file, progress) => console.log(file)}
          // onremovefile={() => this.handleRemoveFile()}
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
          labelTapToUndo="بازنشانی"
          labelButtonRemoveItem="حذف"
          labelButtonRetryItemLoad="تلاش مجدد"
          labelButtonAbortItemProcessing="لغو"
          labelButtonUndoItemProcessing="بازنشانی"
          labelButtonRetryItemProcessing="تلاش مجدد"
          labelButtonProcessItem="بارگذاری"
          
          >
        </FilePond>

        <TextField
          label="عنوان پست"
          className={[classes.inputs, "inputsDir"].join(' ')}
          id="postTitle"
          size="small"
          defaultValue={this.state.title}
          variant="outlined"
          onChange={(e) => this.titleInputHandler(e)}
        />

        <TextField
          label="توضیح مختصر"
          className={[classes.inputs, "inputsDir"].join(' ')}
          id="postAbstract"
          defaultValue={this.state.abstract}
          variant="outlined"
          onChange={(e) => this.abstractInputHandler(e)}
        />

        <div className={
          this.state.maximaizing ? "myeditor-keeper-maximize" : "myeditor-keeper-minimize"
        }>

          <div className="myeditor-keeper-icons">
          <BootstrapTooltip placement="left" title="حالت عادی">
            <div className="myeditor-keeper-icon"
            onClick={() => this.windowMinimizer()} >
              <FontAwesomeIcon icon={faWindowMinimize}
              />
            </div>
          </BootstrapTooltip>

          <BootstrapTooltip placement="left" title="تمام صفحه">
            <div className="myeditor-keeper-icon-ml"
            onClick={() => this.windowMaximizer()}>
              <FontAwesomeIcon icon={faWindowMaximize}
              />
            </div>
          </BootstrapTooltip>
          </div>


          <CKEditor
            editor={ClassicEditor}
            config={
              
              {
                plugins: [Undo, RemoveFormat, Essentials, Bold, Italic, Underline, ParagraphButtonUI, HeadingButtonsUI, HorizontalLine, Paragraph, Blockquote,  SpecialCharacters, SpecialCharactersCurrency, SpecialCharactersMathematical,
                Heading, Alignment, Indent, IndentBlock, PasteFromOffice, Highlight, Font, FontSize, list, Table, TableToolbar, TableProperties, TableCellProperties, Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, ImageUpload, Link , EasyImage, SimpleUploadAdapter, MediaEmbed, Clipboard ],
                
                  toolbar: this.resToolbar,

                  image: {
                    label: 'عکس',
                    toolbar: [ 'imageTextAlternative', '|', 'imageStyle:alignLeft', 'imageStyle:full', 'imageStyle:alignRight' ],
                    styles: [
                      'full',
                      'alignLeft',
                      'alignRight'
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
                    }
                  }
              }
            }
            onChange={(event, editor) => {
              const data = editor.getData();
              this.setState({description: data})
            }}
          />
        </div>


        <Autocomplete
          multiple
          id="tags-filled"
          loading={this.state.loadingPostTags}
          options={this.state.postTopTags.map((option) => option.tagName)}
          freeSolo
          onChange={(event, values) => {
            this.autoCompleteChangeHandler(event, values)
          }}
          renderTags={(value, getTagProps) =>
            this.state.trimedValues.map((option, index) => (
              <Chip 
              label={option}
              {...getTagProps({ index })} />
            ))
          }
          renderInput={(params) => (
            <TextField style={{direction: 'rtl'}} {...params}
            variant="outlined"
            label={this.state.loadingPostTags ? 'درحال بارگیری...' : 'تگ های پست' }
            placeholder="انتخاب یا تایپ کنید"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {this.state.loadingPostTags ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
            />
          )}
        />

        <Autocomplete
          id="combo-box-demo"
          className={classes.marginTop}
          options={this.state.categoriesNames}
          getOptionLabel={(option) => option.title}
          // style={{ width: 300 }}
          onInputChange={(event, value) => this.categoriesNamesAutoChangeHanlder(event, value)}
          renderInput={params => (
            <TextField style={{direction: 'rtl'}} {...params}
            label={this.state.loadingCategoriesNames ? 'درحال بارگیری...' : 'دسته بندی' }
            placeholder="انتخاب کنید"
            variant="outlined" fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {this.state.loadingCategoriesNames ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
            />
          )}
        />


        <FormControlLabel
          className={classes.marginTop}
          control={<Switch checked={this.state.checked} color="primary"
          onChange={this.toggleChecked} />}
          label="قابلیت نمایش"
        />

        <div className={classes.wrapper}>
            <Button
                variant="contained"
                color="primary"
                className={classes.buttonSuccess}
                disabled={this.state.loading}
                onClick={this.sendDataHandler}
                >
                ساخت پست
            </Button>
            {this.state.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
        </div>

        <ToastContainer autoClose={4000}
          position={toast.POSITION.BOTTOM_LEFT}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnVisibilityChange={false}
          pauseOnHover={false}
          rtl={true} />

      </PanelMain>
    );
  }
}

const topDefTags = [
  { title: 'ورزشی', year: 1994 },
  { title: 'خبری', year: 1972 },
]


const mapState = state => {
  return {
    token: state.authReducer.token
  }
}

export default connect(mapState)(withRouter(withStyles(styles)(PostCreate)));
