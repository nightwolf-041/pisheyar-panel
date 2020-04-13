import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PanelMainSinglePosthead from '../../panelMain/panelMainHeads/PanelMainSinglePosthead'
import PanelMain from '../../panelMain/PanelMain';
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import { ToastContainer, toast } from 'react-toastify';

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import 'react-toastify/dist/ReactToastify.css';
import './singlePost.css'

// import classes from './singlePost.module.css'

const styles = theme => ({
    root: {
        width: '100%',
        direction: 'rtl'
      },
      heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
      },
      secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
      },
      justifier: {
        justifyContent: 'center'
      }
  });


class SinglePost extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {

            errorOnLoadData: false,

            loading: false,
            errorMsg: null,

            post: {},

            expanded: false
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
        
        if(this.props.history.state !== 'showSinglepost' || this.props.postGuid === null) {
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

    handleChange = (panel) => (event, isExpanded) => {
        this.setState({expanded: isExpanded ? panel : false});
    };


    render() {
        let post = {...this.state.post}

        const {classes} = this.props;

        // return (
        //     <PanelMain header={<PanelMainSinglePosthead postTitle={post.postTitle}/>}>
        //          {
        //           this.state.loading && !this.state.errorOnLoadData ?
        //           <div className="d-flex justify-content-center">
        //             <div className="spinner-border d-block mr-2" role="status">
        //               <span className="sr-only">Loading...</span>
        //             </div>
        //             <strong className="d-block">در حال بارگیری</strong>
        //           </div>
                   
        //           : null
        //         }

        //         {this.state.errorOnLoadData ?
        //         <h5 className="text-center text-warning">
        //             خطایی در بارگیری رخ داده است
        //         </h5>
        //         :

        //         <div className={classes.postCard}>
        //             {/* <div className={classes.postCardTitle}>
        //                 {
        //                 <div dangerouslySetInnerHTML={{ __html: post.postTitle }} />
        //                 }
        //             </div> */}
        //             <div className={classes.postCardAbstrack}>
        //                 {
        //                 <div dangerouslySetInnerHTML={{ __html: post.postAbstract }} />
        //                 }
        //             </div>
        //             <hr />
        //             <div className={classes.postCardDesc}>
        //                 {
        //                 <div dangerouslySetInnerHTML={{ __html: post.postDescription }} />
        //                 }
        //             </div>
        //         </div>
        //         }

        //         <ToastContainer autoClose={4000}
        //             position={toast.POSITION.BOTTOM_LEFT}
        //             hideProgressBar={false}
        //             closeOnClick={true}
        //             pauseOnVisibilityChange={false}
        //             pauseOnHover={false}
        //             rtl={true} />

        //     </PanelMain>
        // )

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

                <div className={classes.root}>
                    <ExpansionPanel expanded={this.state.expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                        <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                        >
                        <Typography className={classes.heading}>عکس پست</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.justifier}>
                        <Typography>
                           <div className="expanded-panelimage-keeper">
                            <img src="https://lh3.googleusercontent.com/proxy/AXlPzzTxsW_xHN_iYEJ_XVNZ_GmlzMTwCDDIa-pQbbu5_ZLgRFde2hbcIjtL89Fpy-mM_yAIu1vtLSMPB-UHtCD15IOpXwpfqm0wg4Xz1ngCRw7dcr0" />
                           </div>
                        </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={this.state.expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                        <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header"
                        >
                        <Typography className={classes.heading}>عنوان</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {post.postTitle}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={this.state.expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                        <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                        >
                        <Typography className={classes.heading}>توضیح مختصر</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {post.postAbstract}
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={this.state.expanded === 'panel4'} onChange={this.handleChange('panel4')}>
                        <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel4bh-content"
                        id="panel4bh-header"
                        >
                        <Typography className={classes.heading}>محتوا</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div dangerouslySetInnerHTML={{ __html: post.postDescription }} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
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

export default connect(mapState)(withRouter(withStyles(styles)(SinglePost)));
