// this file is main header of dashboard 

import React from 'react';
import { connect } from 'react-redux'
import * as layoutActionCreators from '../../storeConfigure/actionCreators/layoutActionCreators'

import classes from './panelHeader.module.css'
import befoysLogo from '../../assets/images/pisheyar-w.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCommentDots, faBell, faBars } from '@fortawesome/free-solid-svg-icons'

const PanelHeader = (props) => {

    const hideOtherSidesModals = () => {
        props.onHideMainHeaderModal()
        props.onHideSidebarModal()
    } 

    const closeBoxesWithOverlay = () => {
        props.onHideMessageBox()
        props.onHideBellBox()
    }

    const hamburgerShower = () => {
        props.onShowHamburger()
    }

    return (
        <header className={classes.layoutHeader} onClick={hideOtherSidesModals}>
            <div className={props.showMessageBox || props.showBellBox ?
                classes.layoutHeaderOverlayToggle :
                classes.layoutHeaderOverlay
            } onClick={closeBoxesWithOverlay}></div>
            <div className={classes.layoutHeaderNotificatinsBox}>
                <FontAwesomeIcon icon={faCommentDots}
                    className={classes.layoutHeaderMessageIcon}
                    onClick={props.onShowMessageBox} />
                <FontAwesomeIcon icon={faBell}
                    className={classes.layoutHeaderBellIcon}
                    onClick={props.onShowBellBox} />
            </div>
            <img src={befoysLogo} alt="befoys" className={classes.layoutHeaderBefoys} />
            <div className={classes.layoutHeaderTitle}></div>
            <FontAwesomeIcon icon={faBars}
                className={classes.layoutHeaderHamburgerIcon}
                onClick={hamburgerShower} />
        </header>
    );
}

const mapState = state => {
    return {
        showHamburger: state.layout.showHamburger,
        showMessageBox: state.layout.showMessageBox,
        showBellBox: state.layout.showBellBox
    }
}

const mapDispatch = dispatch => {
    return {
        onShowHamburger: () => dispatch(layoutActionCreators.showHamburger()),
        onShowMessageBox: () => dispatch(layoutActionCreators.showMessageBox()),
        onShowBellBox: () => dispatch(layoutActionCreators.showBellBox()),
        onHideMessageBox: () => dispatch(layoutActionCreators.hideMessageBox()),
        onHideBellBox: () => dispatch(layoutActionCreators.hideBellBox()),
        
        onHideMainHeaderModal: () => dispatch(layoutActionCreators.hideMainHeaderModal()),
        onHideSidebarModal: () => dispatch(layoutActionCreators.hideSettingDrop())
    }
}

export default connect(mapState, mapDispatch)(PanelHeader);