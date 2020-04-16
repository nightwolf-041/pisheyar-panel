
import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PanelMainPostEditehead from '../../panelMain/panelMainHeads/PanelMainPostEditehead'
import PanelMain from '../../panelMain/PanelMain'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
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
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { Tooltip} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowMaximize, faWindowMinimize } from '@fortawesome/free-solid-svg-icons'

import 'react-toastify/dist/ReactToastify.css';
import './postEdit.css'

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFilePoster
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
  }
});

 class PostEdit extends React.Component {
   constructor(props) {
     super(props)
     this.state = {

      files: [{
          source: "data:image/jpeg;base64,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",
            options: {
                type: 'local'
            }
        }],

      loaded: false,

      errorOnLoadData: false,

      key1: 0,
      key2: 1,
      key3: 2,

      loading: true,
      errorMsg: '',

      // preLoader: true,
      checked: false,

      title: '',
      abstract: '',
      description: '',

      defaultPostAbstract: '',

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

    if(this.props.history.state !== 'showPostEdit' || this.props.postGuid === null) {
      this.props.history.replace('/postsList')
    } else{

      let guid = this.props.postGuid

      axiosConfig.get(`/Post/GetByGuid/${guid}`, {
          headers: { Authorization: "Bearer " + this.props.token }
      }).then(res => {
          console.log(res.data.post);
          this.setState({
            loading: false,
            post: res.data.post,
            files: res.data.post.document,
            checked: res.data.post.postIsShow,
            defaultPostAbstract: res.data.post.postTitle,
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
    }

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

    console.log(data);
    
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
  let documentObj = {...post.document}
  // let postTitle = this.state.post.postTitle
  // let postAbstract = this.state.post.postAbstract
  
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

        <FilePond ref={ref => this.pond = ref}
          files={this.state.files}
          allowMultiple={false}
          checkValidity={true}
          maxFiles={1}
          allowFilePoster={true}
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
        

        {!this.state.loading ?
          <TextField
          label="عنوان پست"
          className={[classes.inputs, "inputsDir"].join(' ')}
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
                        uploadUrl: 'http://185.94.97.164/api/CKEditor/UploadImage',
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

 const mapState = state => {
   return {
     token: state.authReducer.token,
     postGuid: state.pages.postGuid
   }
 }

 export default connect(mapState)(withRouter(withStyles(styles)(PostEdit)));
