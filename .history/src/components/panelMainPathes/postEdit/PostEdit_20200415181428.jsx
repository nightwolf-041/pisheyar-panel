
import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PerfectScrollbar from 'react-perfect-scrollbar'
import PanelMainPostEditehead from '../../panelMain/panelMainHeads/PanelMainPostEditehead'
import PanelMain from '../../panelMain/PanelMain'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import {FormControlLabel, Switch, Button, CircularProgress, TextField} from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify';

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
import FilePondPluginFilePoster from 'filepond-plugin-file-poster'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageValidateSize from 'filepond-plugin-image-validate-size';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond-plugin-file-poster/dist/filepond-plugin-file-poster.css';

import { Tooltip} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowMaximize, faWindowMinimize } from '@fortawesome/free-solid-svg-icons'

import 'react-toastify/dist/ReactToastify.css';
import './postEdit.css'

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFilePoster,
  FilePondPluginFileValidateSize,
  FilePondPluginImageValidateSize,
  FilePondPluginFileValidateType
  );


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
  titleMarginTop: {
    marginTop: theme.spacing(8),
  }
});

 class PostEdit extends React.Component {
   constructor(props) {
     super(props)
     this.state = {

      files: [],

      loaded: false,

      errorOnLoadData: false,

      key1: 0,
      key2: 1,
      key3: 2,

      loading: true,
      errorMsg: '',

      checked: false,

      title: '',
      abstract: '',
      description: '',

      defaultPostAbstract: '',

      loadingPostTags: true,
      postTopTags: [],
      postDefaultTags: [],
      trimedValues: [top100Films[0].title],
      replacedValues: [],

      loadingCategoriesNames: true,
      categoriesNames: [],
      categoriesDefaultNames: {},
      selectedCategoryName: '',

      post: {}
     }
   }

   errorOnSending = () => toast(this.state.errorMsg, {type: toast.TYPE.ERROR});
   errorOnCatch = () => toast('خطای شبکه', {type: toast.TYPE.ERROR});
   successOnSending = () => toast(this.state.errorMsg, {type: toast.TYPE.SUCCESS});
 
 
   titleInputHandler = (e) => {
    // this.setState( {title: e.target.value})
    let oldPost = {...this.state.post}
    let oldPostTitle = oldPost.postTitle
    oldPostTitle = e.target.value
    oldPost.postTitle = oldPostTitle

    this.setState({post: oldPost})
   }

   abstractInputHandler = (e) => {
    // this.setState( {abstract: e.target.value})
    let oldPost = {...this.state.post}
    let oldPostAbstract = oldPost.postAbstract
    oldPostAbstract = e.target.value
    oldPost.postAbstract = oldPostAbstract

    this.setState({post: oldPost})
   }

   editorChangeHanlder = (data) => {
    let oldPost = {...this.state.post}
    let oldPostDescription = oldPost.postDescription
    oldPostDescription = data
    oldPost.postDescription = oldPostDescription

    this.setState({post: oldPost})
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

    // if(this.props.history.state !== 'showPostEdit' || this.props.postGuid === null) {
      // this.props.history.replace('/postsList')
    // } else{

      // let post = {...this.state.post}
      // let documentArr = post.document
      // let documentObject = {...documentArr}
      // console.log(documentObject);
      // let documentObj = {...documentObject[0]}
      // this.setState({files: documentObject})

      let guid = this.props.postGuid

      axiosConfig.get(`/Post/GetByGuid/${guid}`, {
          headers: { Authorization: "Bearer " + this.props.token }
      }).then(res => {

        console.log(res.data.post);
        let post = res.data.post
        let docObj = {...post.document}
        // let documentArr = newPost.document
        // let documentObject = {...documentArr}
        // let docObj = {...documentObject[0]}
        // let docArray = []
        // docArray.push(docObj)
        // let documentArr = post.document
        // let documentObject = {...documentArr}
        // let docObj = {...documentObject[0]}
        let docObjOptions = {...docObj.options}
        let docObjFile = {...docObjOptions.files}
        let defaultImage = [
          {
              source: docObj.source,
              options: {
                  type: 'local',
                  file: docObjFile,
                  metadata: {
                    poster: docObj.source
                  }
              }
          }
        ]

        let defTags = [...post.tags]
        let defCatgory = {...post.category}
        console.log(defTags);

          this.setState({
            loading: false,
            post: res.data.post,
            files: defaultImage,
            checked: res.data.post.postIsShow,
            defaultPostAbstract: res.data.post.postTitle,
            postDefaultTags: defTags,
            categoriesDefaultNames: defCatgory,
            errorOnLoadData: false
          })
          this.props.history.state = 'showSinglepost'

      }).catch(err => {
          this.setState({
              loading: false,
              errorOnLoadData: true
            })

            this.errorOnCatch()
            setTimeout(() => {
              this.props.history.goBack()
              this.props.history.state = 'showSinglepost'
            }, 2000);
      })

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
        this.setState({
          categoriesNames: res.data.categories,
          // categoriesDefaultNames: res.data.categories[0],
          loadingCategoriesNames: false
        })
      }).catch(err => {
        toast('خطا در بارگیری لیست دسته بندی ها', {type: toast.TYPE.ERROR});
        this.setState({
          categoriesNames: [],
          loadingCategoriesNames: false
        })
      })

    // }
   }

   autoCompleteChangeHandler = (event, values) => {

    // values.concat([top100Films[0].title])
    console.log(values);

    let SpacesRemovedArr = values.filter(str => /\S/.test(str))

    const newValues = SpacesRemovedArr.map(str => str.replace(/^\s+|\s+$|\s+(?=\s)/g, ""))
    .reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[])

    this.setState({trimedValues: newValues} , () => { 

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

    this.setState({replacedValues: replacedTrimedValues})
    })
  }

  categoriesNamesAutoChangeHanlder =(event, value) => {

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

    // this.state.categoriesNames.map(ctg => value === ctg.title ? value = ctg.guid : value = value)
    this.setState({selectedCategoryName: finalValue})
  }



   sendDataHandler = () => {

    let id = this.props.postGuid
    let title = this.state.post.postTitle
    let abstract = this.state.post.postAbstract
    let desc = this.state.post.postDescription
    let check = this.state.checked

    let data = {
      id,title,abstract,desc,check
    }
    
     this.setState({
        loading: true,
      })

     axiosConfig.post('/Post/Update', {
        postGuid: this.props.postGuid,
        title: this.state.post.postTitle,
        abstract: this.state.post.postAbstract,
        description: this.state.post.postDescription,
        isShow: this.state.checked,
        categoriesIds: [2,3]
     }, {
      headers: { Authorization: "Bearer " + this.props.token }
    }).then(res => {
        
        if(res.data.state === 1) {
            this.setState({
                errorMsg: res.data.message
            })
            this.successOnSending()
            setTimeout(() => {
              this.setState({
                loading: false,
              })
              this.props.history.goBack()
              this.props.history.state = 'showSinglepost'
            }, 1500);
        }

        if(res.data.state === 2) {
            this.setState({
                loading: false,
                errorMsg: res.data.message
            })
            this.errorOnSending()
        }

    }).catch(err => {

      this.setState({
        loading: false
      })

      this.errorOnCatch()

    })
   }

   
   render() {

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

  let {post} = this.state

     return (
       <>
       <PanelMain header={<PanelMainPostEditehead />}>

          {this.state.loading ? 
            <div className="d-flex justify-content-center">
              <div className="spinner-border d-block mr-2" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <strong className="d-block">در حال بارگیری</strong>
            </div>
            : null
          }

      {/* <div className="filepond-keeper-box"> */}
        <FilePond ref={ref => this.pond = ref}
          files={this.state.files}
          allowMultiple={false}
          maxFiles={1}
          allowFilePoster={true}
          checkValidity={true}
          allowFileSizeValidation={true}
          maxFileSize='5MB'
          labelMaxFileSizeExceeded="حجم فایل زیاد است"
          labelMaxFileSize="حداکثر حجم مجاز: {filesize}"
          allowImagePreview={true}
          imagePreviewMaxHeight={400}
          allowImageValidateSize={true}
          imageValidateSizeMinWidth={250}
          imageValidateSizeMaxWidth={450}
          imageValidateSizeMinHeight={300}
          imageValidateSizeMaxHeight={700}
          imageValidateSizeLabelFormatError="نوع عکس مجاز نیست"
          imageValidateSizeLabelImageSizeTooSmall="عکس بسیار کوچک است"
          imageValidateSizeLabelImageSizeTooBig="عکس بسیار بزرگ است"
          imageValidateSizeLabelExpectedMinSize="حداقل سایز عکس: {minWidth} × {minHeight}"
          imageValidateSizeLabelExpectedMaxSize="حداکثر سایز عکس: {minWidth} × {minHeight}"
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
          // oninit={() => this.handleInit() }
          onprocessfile={(error, file) => this.setState({documentGuid: file.serverId})}
          onupdatefiles={(fileItems) => {
              this.setState({
                  files: fileItems.map(fileItem => fileItem.file)
              });
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
          labelTapToUndo="بازنشانی"
          labelButtonRemoveItem="حذف"
          labelButtonRetryItemLoad="تلاش مجدد"
          labelButtonAbortItemProcessing="لغو"
          labelButtonUndoItemProcessing="بازنشانی"
          labelButtonRetryItemProcessing="تلاش مجدد"
          labelButtonProcessItem="بارگذاری"
          
          >
        </FilePond>
        {/* </div> */}
        

        {!this.state.loading ?
          <TextField
          label="عنوان پست"
          className={[classes.inputs, "inputsDir", classes.titleMarginTop].join(' ')}
          id="postTitle"
          size="small"
          defaultValue={this.state.post.postTitle}
          variant="outlined"
          onChange={(e) => this.titleInputHandler(e)}
          />
        : null}
          
          {!this.state.loading ?
            <TextField
            label="توضیح مختصر"
            className={[classes.inputs, "inputsDir"].join(' ')}
            id="postAbstract"
            defaultValue={this.state.post.postAbstract}
            variant="outlined"
            onChange={(e) => this.abstractInputHandler(e)}
          />
          : null }


            <div className={
              this.state.maximaizing ? "myEditeditor-keeper-maximize" : "myEditeditor-keeper-minimize"
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
                data={this.state.post.postDescription}
                editor={ClassicEditor}
                config={
                  {
                    plugins: [Undo, RemoveFormat, Essentials, Bold, Italic, Underline, ParagraphButtonUI, HeadingButtonsUI, HorizontalLine, Paragraph, Blockquote,  SpecialCharacters, SpecialCharactersCurrency, SpecialCharactersMathematical,
                    Heading, Alignment, Indent, IndentBlock, PasteFromOffice, Highlight, Font, FontSize, list, Table, TableToolbar, TableProperties, TableCellProperties, Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, ImageUpload, Link , EasyImage, SimpleUploadAdapter, MediaEmbed, Clipboard ],
                    
                      toolbar: this.resToolbar,
    
                      image: {
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
                  let data = editor.getData()
                  this.editorChangeHanlder(data)
                }}
              />
            </div>

            {!this.state.loading ?
            <Autocomplete
              multiple
              id="postEdit-tags"
              loading={this.state.loadingPostTags}
              loadingText="درحال بارگیری"
              noOptionsText="موردی یافت نشد"
              options={this.state.postTopTags.map((option) => option.name)}
              defaultValue={[top100Films[0].title]}
              freeSolo
              onChange={(event, values) => {
                this.autoCompleteChangeHandler(event, values)
                console.log(values);
              }}
              // this.state.trimedValues
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
            :
            <TextField
              style={{direction: 'rtl'}}
              disabled
              className={classes.marginTop}
              label='درحال بارگیری...'
              placeholder="درحال بارگیری..."
              variant="outlined"
              fullWidth
              />
            }


          {!this.state.loading ?
            <Autocomplete
              id="postEdite-categories"
              className={classes.marginTop}
              loading={this.state.loadingCategoriesNames}
              loadingText="درحال بارگیری"
              noOptionsText="موردی یافت نشد"
              options={this.state.categoriesNames}
              getOptionLabel={(option) => option.title}
              defaultValue={this.state.categoriesDefaultNames}
              disabled={this.state.loadingCategoriesNames}
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
            :
            <TextField
              style={{direction: 'rtl'}}
              disabled
              className={classes.marginTop}
              label='درحال بارگیری...'
              placeholder="درحال بارگیری..."
              variant="outlined"
              fullWidth
              />
            }
    
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
                    ویرایش پست
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
       </>
     );
   }
 }

 const def = {guid: "7c16bd61-168f-452d-922d-0d0b1e9af75e", title:'Subject'};

 const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
 ]

 const mapState = state => {
   return {
     token: state.authReducer.token,
     postGuid: state.pages.postGuid
   }
 }

 export default connect(mapState)(withRouter(withStyles(styles)(PostEdit)));
