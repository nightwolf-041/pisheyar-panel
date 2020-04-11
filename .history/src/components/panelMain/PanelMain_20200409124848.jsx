// this file is layout of panel main section and keep its headers and components 

import React from 'react';
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as layoutActionCreators from '../../storeConfigure/actionCreators/layoutActionCreators'
import PerfectScrollbar from 'react-perfect-scrollbar'

import classes from './panelMain.module.css'

const PanelMain = (props) => {

    const hideBoxeseHandler = (e) => {
        props.onHideMessageBox()
        props.onHideBellBox()
        props.onHideSidebarModal()
        e.stopPropagation();
    }

    const hideMainHeaderModalOverlay = () => {
        props.onHideMainHeaderModal()
    }
    

    return(
        <main dir="rtl" className={classes.mainSection} onClick={(e) => hideBoxeseHandler(e)}>
            <div className={
                props.showMainHeaderModal ?
                classes.layoutMainOverlayToggle :
                classes.layoutMainOverlay}
                onClick={hideMainHeaderModalOverlay}>
            </div>
            <PerfectScrollbar>
                {props.header}
                
                <div className={classes.mainSectionPathesSection}>
                    {props.children}
                </div>
            </PerfectScrollbar>
        </main>
    )
}

const mapState = state => {
    return {
        showHamburger: state.layout.showHamburger,
        showMainHeaderModal: state.layout.showMainHeaderModal,
        categoryTitle: state.list.categoryTitle
    }
}


const mapDispatch = dispatch => {
    return {
        onHideMessageBox: () => dispatch(layoutActionCreators.hideMessageBox()),
        onHideBellBox: () => dispatch(layoutActionCreators.hideBellBox()),
        onShowMainHeaderModal: () => dispatch(layoutActionCreators.showMainHeaderModal()),
        onHideMainHeaderModal: () => dispatch(layoutActionCreators.hideMainHeaderModal()),

        onHideSidebarModal: () => dispatch(layoutActionCreators.hideSettingDrop())
    }
}


export default connect(mapState, mapDispatch)(withRouter(PanelMain))