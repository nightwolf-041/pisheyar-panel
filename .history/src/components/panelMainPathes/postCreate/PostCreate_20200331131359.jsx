
import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import PanelMainPostCreatehead from '../../panelMain/panelMainHeads/PanelMainPostCreatehead'
import PanelMain from '../../panelMain/PanelMain'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import { Editor } from '@tinymce/tinymce-react';
import {FormControlLabel, Switch} from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './postCreate.css'

 class PostCreate extends React.Component {
   constructor(props) {
     super(props)
     this.state = {

      loaded: false,

      loading: true,
      errorMsg: null,

      preLoader: true,
      checked: false,

      title: '',
      abstract: '',
      description: ''
     }

   }

   errorOnSending = () => toast(this.state.errorMsg, {type: toast.TYPE.ERROR});
   errorOnCatch = () => toast('خطای شبکه', {type: toast.TYPE.ERROR});
   successOnSending = () => toast(this.state.errorMsg, {type: toast.TYPE.SUCCESS});


   titleInputHandler = (e) => {
    this.setState( {title: e.target.value})
   }

   handleEditorChangeTop = (content, editor) => {
     this.setState( {abstract: content})
   }

   handleEditorChangeBott = (content, editor) => {
     this.setState( {description: content})
   }

   toggleChecked = () => {
     let oldchecked = this.state.checked
     this.setState({checked: !oldchecked})
   }


   sendDataHandler = () => {
     let titleValue = this.state.title
     let abstractValue = this.state.abstract
     let descriptionValue = this.state.description
     let checkValue = this.state.checked

     this.setState({
      loading: true,
    })

     axiosConfig.post('/Post/Create', {
      title: titleValue,
      abstract: abstractValue,
      description: descriptionValue,
      isShow: checkValue,
      categoriesIds: [2,3]
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


   
   render() {
     return (
       <PanelMain header={<PanelMainPostCreatehead />}>
          {!this.state.loaded ? 
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


          {this.state.loaded ? 
            <input className="form-control top-input" defaultValue={this.state.title}
            onChange={(e) => this.titleInputHandler(e)} />
            : null
          }


            {this.state.loaded ? 
              <h5 className="text-right text-secondary mt-5 mb-3">
                توضیح مختصر پست خود را بنویسید
              </h5>
              :null 
            }
          
            <div style={{position: 'relative'}}>
              <Editor
              // apiKey='s5t2laxkqiazmks1pfjhbhqayi9b8k2103yyp4fuzvodb6cq'
              cloudChannel='5-dev'
              initialValue=""
              outputFormat='html'
              init = {{
                selector: 'textarea',
                plugins: ['advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code',
                  'insertdatetime media table paste code blockquote help wordcount directionality hr casechange hr formatpainter',
                  'save '],
                mobile: {
                  plugins: 'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars image link media mediaembed template codesample charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern help formatpainter pageembed charmap mentions quickbars linkchecker emoticons',
                },
                // menubar: 'file edit view insert format tools table tc help',
                toolbar: ['undo redo | fontselect  formatselect fontsizeselect | bold italic | strikethrough | backcolor forecolor permanentpen \
                alignleft aligncenter alignright alignjustify \
                bullist numlist outdent indent | blockquote | subscript superscript | removeformat | help | image | link \
                insertdatetime | table | ltr rtl | save | casechange \
                hr | formatpainter '],
                content_css: '//www.tiny.cloud/css/codepen.min.css',
                image_class_list: [
                  { title: 'None', value: '' },
                  { title: 'وسط چین', value: 'class-name' }
                ],
                height: 400,
                branding: false,
                fixed_toolbar_container: '#mytoolbar',
                a11y_advanced_options: true,
                image_title: true,
                image_caption: true,
                image_description: true,
                image_uploadtab: true,
                menu: {
                  file: { title: 'File', items: 'newdocument restoredraft | preview | print ' },
                  edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
                  view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
                  insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
                  format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat' },
                  tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
                  table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
                  help: { title: 'Help', items: 'help' }
                },
              
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
            </div>

            {this.state.loaded ? 
              <h5 className="text-right text-secondary mt-5 mb-3">
                محتویات پست خود را بنویسید
              </h5>
              : null 
            }

            <Editor
              // apiKey='s5t2laxkqiazmks1pfjhbhqayi9b8k2103yyp4fuzvodb6cq'
              initialValue=""
              outputFormat='html'
              init={{
                height: 300,
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
              onEditorChange={this.handleEditorChangeBott}
            />

            {this.state.loaded ? 
              <FormControlLabel
                  control={<Switch checked={this.state.checked} onChange={this.toggleChecked} />}
                  label="قابلیت نمایش"
                />
                : null
            }

            <button className="btn btn-block btn-primary tiny-send-button"
            disabled={this.state.loading}
            onClick={this.sendDataHandler}>
              {this.state.loading ? 'صبور باشید'
                : 'ارسال'
              }
            </button>

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

 const mapState = state => {
   return {
     token: state.authReducer.token
   }
 }

 export default connect(mapState)(withRouter(PostCreate));


// import React, { Component } from "react";
// import PanelMainPostCreatehead from '../../panelMain/panelMainHeads/PanelMainPostCreatehead'
// import PanelMain from '../../panelMain/PanelMain'

// import CKEditor from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
// import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
// import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
// import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
// import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
// import Heading from '@ckeditor/ckeditor5-heading/src/heading';
// import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
// import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor';
// import FontSize from '@ckeditor/ckeditor5-font/src/fontsize';
// import Image from '@ckeditor/ckeditor5-image/src/image';
// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
// import list from '@ckeditor/ckeditor5-list/src/list';
// import Table from '@ckeditor/ckeditor5-table/src/table';
// import Undo from '@ckeditor/ckeditor5-undo/src/undo';
// import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline';
// import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight';
// import Blockquote from '@ckeditor/ckeditor5-block-quote/src/blockquote';
// import Codeblock from '@ckeditor/ckeditor5-code-block/src/codeblock';

// import CKEditor from 'ckeditor4-react';

// const editorConfiguration = {
//   plugins: [Undo, Essentials, Bold, Italic, Underline, HorizontalLine, Paragraph, Blockquote,
//   Codeblock, Heading, Alignment, Highlight, FontColor, FontSize, list, Image, EasyImage, Table ],

//   toolbar: ["undo", "bold", "italic", "underline", "horizontalline", "blockquote", "codeblock", "heading", "alignment", "highlight","fontcolor", "fontsize",
//   'list', 'bulletedList', 'numberedList', "image", "imageupload", "table" ],
// };

// const cloudServices = {
//   tokenUrl: 'https://example.com/cs-token-endpoint',
//   uploadUrl: 'https://your-organization-id.cke-cs.com/easyimage/upload/'
// }


// ["undo", "bold", "italic", "underline", "horizontalline", "blockquote", "codeblock", "heading", "alignment", "highlight","fontcolor", "fontsize",
// 'list', 'bulletedList', 'numberedList', "image", "imageupload", "table" ]

// class PostCreate extends Component {
//   render() {
//     return (
      // <PanelMain header={<PanelMainPostCreatehead />}>
        {/* <CKEditor style={{height: '400px'}}
          editor={ClassicEditor}
          cloudServices={cloudServices}
          config={editorConfiguration}
          data="<p>Hello from CKEditor 5!</p>"
          onInit={editor => {
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
        /> */}
        {/* <CKEditor
          type="classic"
          data="<p>Hello from CKEditor 4!</p>"
          editorUrl= 'https://your-website.example/ckeditor/ckeditor.js'
          config={ {
            toolbar: [ ['Undo','Redo'], [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript'], ['JustifyLeft', 'JustifyCenter', 'JustifyRight'] ],
            useComputedState: true,
            editorUrl: 'https://your-website.example/ckeditor/ckeditor.js'
        } }
        /> */}
        // </PanelMain>
//     );
//   }
// }

// export default PostCreate;