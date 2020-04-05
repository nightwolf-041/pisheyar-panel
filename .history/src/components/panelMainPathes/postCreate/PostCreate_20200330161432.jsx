
// import '../../../assets/js/theme.min'

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
// import {Editor} from 'tinymce-react';

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
          
          
              <Editor
              apiKey='s5t2laxkqiazmks1pfjhbhqayi9b8k2103yyp4fuzvodb6cq'
              initialValue=""
              outputFormat='html'
              init = {{
                selector: 'textarea#full-featured',
                plugins: 'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap tinycomments mentions quickbars linkchecker emoticons advtable',
                tinydrive_token_provider: 'URL_TO_YOUR_TOKEN_PROVIDER',
                tinydrive_dropbox_app_key: 'YOUR_DROPBOX_APP_KEY',
                tinydrive_google_drive_key: 'YOUR_GOOGLE_DRIVE_KEY',
                tinydrive_google_drive_client_id: 'YOUR_GOOGLE_DRIVE_CLIENT_ID',
                mobile: {
                  plugins: 'print preview powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker textpattern noneditable help formatpainter pageembed charmap mentions quickbars linkchecker emoticons advtable'
                },
                menu: {
                  tc: {
                    title: 'TinyComments',
                    items: 'addcomment showcomments deleteallconversations'
                  }
                },
                menubar: 'file edit view insert format tools table tc help',
                toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
                autosave_ask_before_unload: true,
                autosave_interval: "30s",
                autosave_prefix: "{path}{query}-{id}-",
                autosave_restore_when_empty: false,
                autosave_retention: "2m",
                image_advtab: true,
                content_css: '//www.tiny.cloud/css/codepen.min.css',
                link_list: [
                  { title: 'My page 1', value: 'http://www.tinymce.com' },
                  { title: 'My page 2', value: 'http://www.moxiecode.com' }
                ],
                image_list: [
                  { title: 'My page 1', value: 'http://www.tinymce.com' },
                  { title: 'My page 2', value: 'http://www.moxiecode.com' }
                ],
                image_class_list: [
                  { title: 'None', value: '' },
                  { title: 'Some class', value: 'class-name' }
                ],
                importcss_append: true,
                height: 400,
                templates: [
                      { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
                  { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
                  { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
                ],
                template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
                height: 600,
                image_caption: true,
                quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                noneditable_noneditable_class: "mceNonEditable",
                toolbar_mode: 'sliding',
                spellchecker_dialog: true,
                spellchecker_whitelist: ['Ephox', 'Moxiecode'],
                tinycomments_mode: 'embedded',
                content_style: ".mymention{ color: gray; }",
                contextmenu: "link image imagetools table configurepermanentpen",
                a11y_advanced_options: true,
                /* 
                The following settings require more configuration than shown here.
                For information on configuring the mentions plugin, see:
                https://www.tiny.cloud/docs/plugins/mentions/.
                */
                // mentions_selector: '.mymention',
                // mentions_fetch: mentions_fetch,
                // mentions_menu_hover: mentions_menu_hover,
                // mentions_menu_complete: mentions_menu_complete,
                // mentions_select: mentions_select,
               }}
              
              onEditorChange={this.handleEditorChangeTop}
            />

            {this.state.loaded ? 
              <h5 className="text-right text-secondary mt-5 mb-3">
                محتویات پست خود را بنویسید
              </h5>
              : null 
            }

            <Editor
              apiKey='s5t2laxkqiazmks1pfjhbhqayi9b8k2103yyp4fuzvodb6cq'
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
// import CKEditor from "@ckeditor/ckeditor5-react";
// import PanelMainPostCreatehead from '../../panelMain/panelMainHeads/PanelMainPostCreatehead'
// import PanelMain from '../../panelMain/PanelMain'

// import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor";
// import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials";
// import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold";
// import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic";
// import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline";
// import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph";
// import Heading from '@ckeditor/ckeditor5-heading/src/heading'
// import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment'
// import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor'
// import FontSize from '@ckeditor/ckeditor5-font/src/fontsize'
// import Image from '@ckeditor/ckeditor5-image/src/image'
// import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
// import list from '@ckeditor/ckeditor5-list/src/list'
// import Table from '@ckeditor/ckeditor5-table/src/table'
// import Undo from '@ckeditor/ckeditor5-undo/src/undo'
// import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline'
// import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight'
// import Blockquote from '@ckeditor/ckeditor5-block-quote/src/blockquote'
// import Codeblock from '@ckeditor/ckeditor5-code-block/src/codeblock'

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

// import Ckeditor from 'ckeditor4/ckeditor'

// <Ckeditor
// data="<p>Hello from CKEditor 5!</p>"
// />

// class PostCreate extends Component {
//   render() {
//     return (
//       <PanelMain header={<PanelMainPostCreatehead />}>
//         <CKEditor
//           editor={ClassicEditor}
//           cloudServices={cloudServices}
//           config={editorConfiguration}
//           data="<p>Hello from CKEditor 5!</p>"
//           onInit={editor => {
//             console.log("Editor is ready to use!", editor);
//           }}
//           onChange={(event, editor) => {
//             const data = editor.getData();
//             console.log({ event, editor, data });
//           }}
//           onBlur={(event, editor) => {
//             console.log("Blur.", editor);
//           }}
//           onFocus={(event, editor) => {
//             console.log("Focus.", editor);
//           }}
//         />
//     );
//   }
// }

// export default PostCreate;