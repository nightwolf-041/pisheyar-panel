import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PanelMainSinglePosthead from '../../panelMain/panelMainHeads/PanelMainSinglePosthead'
import PanelMain from '../../panelMain/PanelMain';
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import classes from './singlePost.module.css'


class SinglePost extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {

            errorOnLoadData: false,

            loading: false,
            errorMsg: null,

            post: {}
        }

    }

    errorOnCatch = () => toast('خطای شبکه', {type: toast.TYPE.ERROR});

    // componentWillUnmount(prevState, nextState) {
    //     if(prevState !== nextState) {
    //         return
    //     }
    // }


    componentDidMount(){

        console.log(this.props.history.state);

        if(this.props.history.state !== 'showSinglePost' || this.props.postGuid === null) {
            this.props.history.replace('/postsList')
        } else{
        
            this.setState({loading: true})

            let guid = this.props.postGuid
            axiosConfig.get(`/Post/GetByGuid/${guid}`, {
                headers: { Authorization: "Bearer " + this.props.token }
            }).then(res => {
                
                this.setState({
                    loading: false,
                    post: res.data.post,
                    errorMsg: res.data.message,
                    errorOnLoadData: false
                })

            }).catch(err => {
                this.setState({
                    loading: false,
                    errorOnLoadData: true
                })
        
                this.errorOnCatch()
                setTimeout(() => {
                    this.props.history.replace('/postsList')
                }, 2000);
            })
        }
    }


    render() {
        let post = {...this.state.post}
        return (
            <PanelMain header={<PanelMainSinglePosthead postTitle={post.postTitle}/>}>
                 {
                  this.state.loading && !this.state.errorOnLoadData ?
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border d-block mr-2" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                    <strong className="d-block">در حال بارگیری</strong>
                  </div>
                   
                  : null
                }

                {this.state.errorOnLoadData ?
                <h5 className="text-center text-warning">
                    خطایی در بارگیری رخ داده است
                </h5>
                :

                <div className={classes.postCard}>
                    {/* <div className={classes.postCardTitle}>
                        {
                        <div dangerouslySetInnerHTML={{ __html: post.postTitle }} />
                        }
                    </div> */}
                    <div className={classes.postCardAbstrack}>
                        {
                        <div dangerouslySetInnerHTML={{ __html: post.postAbstract }} />
                        }
                    </div>
                    <hr />
                    <div className={classes.postCardDesc}>
                        {
                        <div dangerouslySetInnerHTML={{ __html: post.postDescription }} />
                        }
                    </div>
                </div>
                }

                <ToastContainer autoClose={4000}
                    position={toast.POSITION.BOTTOM_LEFT}
                    hideProgressBar={false}
                    closeOnClick={true}
                    pauseOnVisibilityChange={false}
                    pauseOnHover={false}
                    rtl={true} />

            </PanelMain>
        )
    }
}

const mapState = state => {
    return {
        postGuid: state.pages.postGuid,
        token: state.authReducer.token
    }
}

export default connect(mapState)(withRouter(SinglePost));