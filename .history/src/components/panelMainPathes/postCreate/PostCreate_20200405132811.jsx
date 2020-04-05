
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
import Title from '@ckeditor/ckeditor5-heading/src/title';
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
import CKfinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder'
import EasyImage from '@ckeditor/ckeditor5-easy-image/src/easyimage';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
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

// import CKEditor from 'ckeditor4-react';
// import '../../../assets/js/plugin'

// const editorConfiguration = {
//   plugins: [Undo, Essentials, Bold, Italic, Underline, HorizontalLine, Paragraph, Blockquote,
//   Codeblock, Heading, Alignment, Highlight, Font, FontSize, list, Image, EasyImage, Table ],

//   toolbar: ["undo", "bold", "italic", "underline", "horizontalline", "blockquote", "codeblock", "heading", "alignment", "highlight","fontcolor", "fontBackgroundColor", "fontsize",
//   'list', 'bulletedList', 'numberedList', "image", "imageupload", "table" ],

//   contentsLangDirection: 'rtl'

// };

// const cloudServices = {
//   tokenUrl: 'http://185.94.97.164/api/CKEditor/UploadImage',
//   uploadUrl: 'http://185.94.97.164/api/CKEditor/UploadImage'
// }
// "image",  EasyImage,  "imageupload",


// import CKeditor from 'ckeditor4'

class PostCreate extends Component {

  render() {

    const customColorPalette = [
      {
          color: 'hsl(4, 90%, 58%)',
          label: 'Red'
      },
      {
          color: '#ffcdd2',
          label: 'LightRed'
      },
      {
          color: 'hsl(340, 82%, 52%)',
          label: 'Pink'
      },
      {
          color: '#F8BBD0',
          label: 'LightPink'
      },
      {
          color: 'hsl(291, 64%, 42%)',
          label: 'Purple'
      },
      {
          color: '#E1BEE7',
          label: 'LightPurple'
      },
      {
          color: '#00C853',
          label: 'Green'
      },
      {
          color: '#C8E6C9',
          label: 'LightGreen'
      },
      {
          color: '#B0BEC5',
          label: 'BlueGrey'
      },
      {
          color: 'hsl(207, 90%, 54%)',
          label: 'Blue'
      },
      {
          color: '#BBDEFB',
          label: 'LightBlue'
      },
      {
          color: '#ccc',
          label: 'Grey'
      },
  
      // ...
  ];

    return (
      <PanelMain header={<PanelMainPostCreatehead />}>

        <CKEditor style={{height: '400px'}}
          editor={ClassicEditor}
          config={
            
            {
              plugins: [Undo, RemoveFormat, Essentials, Bold, Italic, Underline, BlockToolbar, ParagraphButtonUI, HeadingButtonsUI, HorizontalLine, Paragraph, Blockquote,  SpecialCharacters, SpecialCharactersCurrency, SpecialCharactersMathematical,
              Codeblock, Heading, Alignment, Indent, IndentBlock, PasteFromOffice, Highlight, Font, FontSize, list, Table, TableToolbar, TableProperties, TableCellProperties, Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, Link, Base64UploadAdapter, EasyImage, MediaEmbed ],
              
                toolbar: ["undo", "redo", "removeFormat", '|', "bold", "italic", "underline", "horizontalline", "blockquote", '|', "insertTable", "codeblock", "specialCharacters", '|', "heading", "alignment", '|', 'outdent', 'indent', '|', "fontFamily", "highlight","fontcolor", "fontBackgroundColor", "fontsize", '|', "image",'bulletedList', 'numberedList', '|', "table", "mediaEmbed", "link", "imageupload" ],

                blockToolbar: [
                  'paragraph', 'heading',
                  '|',
                  "bold", "italic", "underline",
                  '|',
                  'bulletedList', 'numberedList'
                ],

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
                    12,
                    14,
                    16,
                    19
                  ]
              },

                fontColor: {
                  colors: [
                      {
                          color: 'hsl(0, 0%, 0%)',
                          label: 'Black'
                      },
                      {
                          color: 'hsl(0, 0%, 30%)',
                          label: 'Dim grey'
                      },
                      {
                          color: 'hsl(0, 0%, 60%)',
                          label: 'Grey'
                      },
                      {
                          color: 'hsl(0, 0%, 90%)',
                          label: 'Light grey'
                      },
                      {
                          color: 'hsl(0, 0%, 100%)',
                          label: 'White',
                          hasBorder: true
                      },
                      {
                        color: '#f44336',
                        label: 'Red'
                      },
                      {
                        color: '#03A9F4',
                        label: 'Blue'
                      },
                      {
                        color: '#4CAF50',
                        label: 'Green'
                      },
                      {
                        color: '#FFEB3B',
                        label: 'Yellow'
                      },
      
                      // ...
                  ],
                  columns: 5
              },
              fontBackgroundColor: {
                  colors: [
                      // {
                      //     color: 'hsl(0, 75%, 60%)',
                      //     label: 'Red'
                      // },
                      // {
                      //     color: 'hsl(30, 75%, 60%)',
                      //     label: 'Orange'
                      // },
                      // {
                      //     color: 'hsl(60, 75%, 60%)',
                      //     label: 'Yellow'
                      // },
                      // {
                      //     color: 'hsl(90, 75%, 60%)',
                      //     label: 'Light green'
                      // },
                      {
                          color: '#0275d8',
                          label: 'Primary'
                      },
                      {
                          color: '#0275d8',
                          label: 'Success'
                      },
                      {
                          color: '#0275d8',
                          label: 'Info'
                      },
                      {
                          color: '#0275d8',
                          label: 'Warning'
                      },
                      {
                          color: '#0275d8',
                          label: 'Danger'
                      },
                      {
                          color: '#0275d8',
                          label: 'Warning'
                      },
      
                      // ...
                  ],
                  columns: 12
              },

              table: {
                contentToolbar: [
                    'tableColumn', 'tableRow', 'mergeTableCells',
                    'tableProperties', 'tableCellProperties'
                ],
    
                // Set the palettes for tables.
                tableProperties: {
                    borderColors: customColorPalette,
                    backgroundColors: customColorPalette
                },
    
                // Set the palettes for table cells.
                tableCellProperties: {
                    borderColors: customColorPalette,
                    backgroundColors: customColorPalette
                }
              },

                placeholder: 'Type here!',

                // ckfinder: {
                //   uploadUrl: 'http://185.94.97.164/api/CKEditor/UploadImage'
                // },

                // simpleUpload: {
                //   uploadUrl: 'http://185.94.97.164/api/CKEditor/UploadImage',
                //   headers: {
                //     'X-CSRF-TOKEN': 'CSFR-Token',
                //     Authorization: 'Bearer <JSON Web Token>'
                //   }
                // }

            }
          }
          // data="<p>Hello from CKEditor 5!</p>"
          height = '400'
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
        />
        {/* <CKEditor
          data="<p>آماده استفاده</p>"
          // editorUrl= 'https://your-website.example/ckeditor/ckeditor.js'
          config={ {
            // toolbar: [ ['Undo','Redo'], [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript'], ['JustifyLeft', 'JustifyCenter', 'JustifyRight'], ['Image'] ],
            useComputedState: true,
            removeDialogTabs: 'image:advanced;image:Link;link:advanced;link:upload',
            // height: 400,
            // editorUrl: 'https://your-website.example/ckeditor/ckeditor.js'
            // filebrowserUploadMethod: 'post',
            // filebrowserImageUploadUrl: 'http://185.94.97.164/api/CKEditor/UploadImage',
            filebrowserUploadMethod: 'form',
            filebrowserImageUploadUrl: 'http://185.94.97.164/api/CKEditor/UploadImage',
            // filebrowserUploadUrl
            // uploadUrl: 'http://185.94.97.164/api/CKEditor/UploadImage',
            // contentsLang: 'fa',
            contentsLangDirection: 'rtl',
        } }
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
        />  */}
        </PanelMain>
    );
  }
}

export default PostCreate;