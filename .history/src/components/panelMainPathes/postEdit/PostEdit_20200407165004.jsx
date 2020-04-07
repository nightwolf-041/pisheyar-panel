
import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PanelMainPostEditehead from '../../panelMain/panelMainHeads/PanelMainPostEditehead'
import PanelMain from '../../panelMain/PanelMain'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
// import { Editor } from '@tinymce/tinymce-react';
import {FormControlLabel, Switch} from '@material-ui/core'
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

import { Tooltip} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowMaximize, faWindowMinimize } from '@fortawesome/free-solid-svg-icons'

import 'react-toastify/dist/ReactToastify.css';
import './postEdit.css'


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

      loaded: false,

      errorOnLoadData: false,

      key1: 0,
      key2: 1,
      key3: 2,

      loading: false,
      errorMsg: '',

      // preLoader: true,
      checked: false,

      title: '',
      abstract: '',
      description: '',

      post: {}
     }
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

    if(!this.props.history.push || this.props.postGuid === null) {
      this.props.history.replace('/postsList')
    } else{

      let guid = this.props.postGuid

      axiosConfig.get(`/Post/GetByGuid/${guid}`, {
          headers: { Authorization: "Bearer " + this.props.token }
      }).then(res => {
          console.log(res.data.post);
          this.setState({
              post: res.data.post,
              checked: res.data.post.postIsShow,
              errorOnLoadData: false
          })

      }).catch(err => {
          this.setState({
              loading: false,
              errorOnLoadData: true
            })

            this.errorOnCatch()
            setTimeout(() => {
              this.props.history.goBack()
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

  
     return (
       <>
       <PanelMain header={<PanelMainPostEditehead />}>

          {!this.state.errorOnLoadData ? 
            <div className="d-flex justify-content-center">
              <div className="spinner-border d-block mr-2" role="status">
                <span className="sr-only">Loading...</span>
              </div>
              <strong className="d-block">در حال بارگیری</strong>
            </div>
            : null
          }
        

            {this.state.loaded ? 
              <h5 className="text-right text-secondary mt-3 mb-3">
                عنوان پست خود را بنویسید
              </h5>
              : null
            }

          {this.state.errorOnLoadData ?
            <div></div>
            :
            <input className="form-control top-input" defaultValue={this.state.post.postTitle}
            onChange={(e) => this.titleInputHandler(e)} />
            // <Editor
            // key={0}
            // apiKey='s5t2laxkqiazmks1pfjhbhqayi9b8k2103yyp4fuzvodb6cq'
            // initialValue={this.state.post.postTitle}
            // value={this.state.post.postTitle}
            // outputFormat='html'
            // init={{
            //     height: 150,
            //     menubar: false,
            //     plugins: [
            //     'advlist autolink lists link image charmap print preview anchor',
            //     'searchreplace visualblocks code fullscreen',
            //     'insertdatetime media table paste code help wordcount directionality hr fullscreen casechange hr formatpainter ',
            //     'save '
            //     ],
            //     toolbar:
            //     'undo redo | fontselect  formatselect fontsizeselect | bold italic strikethrough | backcolor forecolor permanentpen \
            //     alignleft aligncenter alignright alignjustify | \
            //     bullist numlist outdent indent | removeformat | help | image | link \
            //     insertdatetime | table | ltr rtl | fullscreen | save | casechange \
            //     hr | formatpainter ',

            //     setup: (editor) => {
            //       editor.on("init", () => {
            //         console.log('initialized')
            //       {
            //         this.setState({loaded: true, loading: false})
            //       }
            //       })
            //     }
                
            //     }}
            //     onEditorChange={this.titleInputHandler}
            // />
              }
          
            {this.state.loaded ? 
              <h5 className="text-right text-secondary mt-5 mb-3">
                توضیح مختصر پست خود را بنویسید
              </h5>
              :null 
            }


            {this.state.errorOnLoadData ?
            <h5 className="text-center text-warning">خطایی در بارگیری رخ داده</h5>
            :
            <Editor
            key={1}
            apiKey='s5t2laxkqiazmks1pfjhbhqayi9b8k2103yyp4fuzvodb6cq'
            initialValue={this.state.post.postAbstract}
            value={this.state.post.postAbstract}
            outputFormat='html'
            init={{
                height: 250,
                menubar: false,
                plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount directionality hr fullscreen casechange hr formatpainter ',
                'save '
                ],
                toolbar: 
                'undo redo | fontselect  formatselect fontsizeselect | bold italic strikethrough | backcolor forecolor permanentpen \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help | image | link \
                insertdatetime | table | ltr rtl | fullscreen | save | casechange \
                hr | formatpainter ',
                
                setup: (editor) => {
                  editor.on("init", () => {
                    console.log('initialized')
                  {
                    this.setState({loaded: true, loading: false})
                  }
                  })
                }
                }}
                onEditorChange={this.handleEditorChangeTop}
            />
            }

             {this.state.loaded ? 
              <h5 className="text-right text-secondary mt-5 mb-3">
                محتویات پست خود را بنویسید
              </h5>
              : null 
            }

            {this.state.errorOnLoadData ?
            <div></div>
            :
            <Editor
              key={2}
              apiKey='s5t2laxkqiazmks1pfjhbhqayi9b8k2103yyp4fuzvodb6cq'
              initialValue={this.state.post.postDescription}
              value={this.state.post.postDescription}
              outputFormat='html'
              init={{
                height: 350,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount directionality hr fullscreen casechange hr formatpainter ',
                  'save '
                ],
                toolbar:
                  'undo redo | fontselect  formatselect fontsizeselect | bold italic strikethrough | backcolor forecolor permanentpen \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help | image | link \
                  insertdatetime | table | ltr rtl | fullscreen | save | casechange \
                  hr | formatpainter ',

              }}
              onEditorChange={this.handleEditorChangeBott}
            />
          }

            {this.state.loaded ? 
              <FormControlLabel
                  control={<Switch checked={this.state.checked} onChange={this.toggleChecked} />}
                  label="قابلیت نمایش"
                />
                : null
            }

          {this.state.errorOnLoadData ?
            <div></div>
            :
            <button className="btn btn-block btn-primary tiny-send-button"
              disabled={this.state.loading}
              onClick={this.sendDataHandler}>
              {this.state.loading ? 'صبور باشید'
                :'ارسال'
              }
            </button>
          }

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

 export default connect(mapState)(withRouter(PostEdit));