// this file is header of panel main (/settings route) 

import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Tooltip} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axiosConfig from '../../../axiosConfigure/axiosConfig'
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'

import classes from '../panelMain.module.css'


class PanelMainSinglePosthead extends React.Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            post: {}
        }
    }

    errorOnCatch = () => toast('خطای شبکه', {type: toast.TYPE.ERROR});

    componentWillUnmount(prevState, nextState) {
        this._isMounted = false;
    }


    componentDidMount() {
        this._isMounted = true;

        let guid = this.props.postGuid

        axiosConfig.get(`/Post/GetByGuid/${guid}`, {
            headers: { Authorization: "Bearer " + this.props.token }
        }).then(res => {
            if (this._isMounted) {
                this.setState({post: res.data.post})
            }

        }).catch(err => {
            this.errorOnCatch()
        })
    }


    redirectToPostedit = () => {
        this.props.history.push('/postEdit')
        this.props.history.state = 'showPostEdit'
    }

    postdeleteHandler = () => {
    }

      
    render() {

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
            const classes = useStylesBootstrap();
          
            return <Tooltip arrow classes={classes} {...props} />;
          }

    return (
        <>
            <div className={classes.mainSectionSpinnerBackdrop}></div>

            <div className={classes.mainSectionHeader}>
                <div className={classes.mainSectionHeaderDescs}>
                    <h5 className={classes.mainSectionHeaderTitle}>
                        {this.props.postTitle}
                    </h5>
                    <p className={classes.mainSectionHeaderSubtitle}></p>
                </div>
                

                <div className={classes.mainSectionHeaderIcons}>

                    <BootstrapTooltip placement="right" title="ویرایش">
                        <div style={{cursor: 'pointer'}} onClick={() => this.redirectToPostedit()}>
                        <FontAwesomeIcon icon={faEdit}
                            className={classes.mainSectionHeaderIcon}
                             />
                        </div>
                    </BootstrapTooltip>

                    {/* <BootstrapTooltip placement="right" title="حذف">
                        <div className="mr-2">
                        <FontAwesomeIcon icon={faTrash}
                            className={classes.mainSectionHeaderIcon}
                            onClick={() => this.postdeleteHandler()} />
                        </div>
                    </BootstrapTooltip> */}
                     
                </div>
            </div>

            <ToastContainer autoClose={4000}
                position={toast.POSITION.BOTTOM_LEFT}
                hideProgressBar={false}
                closeOnClick={true}
                pauseOnVisibilityChange={false}
                pauseOnHover={false}
                rtl={true} />
        </>
    )
}
   
}


const mapState = state => {
    return {
        token: state.authReducer.token,
        postGuid: state.pages.postGuid
    }
}


export default connect(mapState)(withRouter(PanelMainSinglePosthead))