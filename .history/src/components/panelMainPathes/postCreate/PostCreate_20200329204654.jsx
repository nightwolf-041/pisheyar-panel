
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
// // import {Editor} from 'tinymce-react';

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
          
          
//               <Editor
//               apiKey='s5t2laxkqiazmks1pfjhbhqayi9b8k2103yyp4fuzvodb6cq'
//               initialValue=""
//               outputFormat='html'
//               init={{
//                 selector: 'textarea',
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

//                   // images_upload_url : 'youruploadscript.php',
                  
//                   setup: (editor) => {
//                   editor.on("init", () => {
//                     console.log('initialized')
//                   {
//                     this.setState({loaded: true, loading: false})
//                   }
//                   })
//                 }
                
//               }}
//               onEditorChange={this.handleEditorChangeTop}
//             />

//             {this.state.loaded ? 
//               <h5 className="text-right text-secondary mt-5 mb-3">
//                 محتویات پست خود را بنویسید
//               </h5>
//               : null 
//             }

//             <Editor
//               apiKey='s5t2laxkqiazmks1pfjhbhqayi9b8k2103yyp4fuzvodb6cq'
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


import React from 'react';
import ReactDOM from 'react-dom';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

// Include special components if required.
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';
