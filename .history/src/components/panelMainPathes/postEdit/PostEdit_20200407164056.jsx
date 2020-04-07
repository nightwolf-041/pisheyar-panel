
import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import panelMainPostEdithead from '../../panelMain/panelMainHeads/panelMainPostEdithead'
import PanelMain from '../../panelMain/PanelMain'
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import { Editor } from '@tinymce/tinymce-react';
import {FormControlLabel, Switch} from '@material-ui/core'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './postEdit.css'



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
    let post = {...this.state.post}
    let title = post.postTitle
    title = e.target.value
    post.postTitle = title
    this.setState( {post: post})
   }

   handleEditorChangeTop = (content, editor) => {
    let post = {...this.state.post}
    let abstract = post.postAbstract
    abstract = content
    post.postAbstract = abstract
    this.setState( {post: post})
   }

   handleEditorChangeBott = (content, editor) => {
    let post = {...this.state.post}
    let desc = post.postDescription
    desc = content
    post.postDescription = desc
    this.setState( {post: post})
   }

   toggleChecked = () => {
     let oldchecked = this.state.checked
     this.setState({checked: !oldchecked})
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
  
     return (
       <>
       <PanelMain header={<panelMainPostEdithead />}>

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