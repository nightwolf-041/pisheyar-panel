// this file is bell box of main layout .... its icon in main header 

import React from 'react';
import {connect} from 'react-redux'
import anime from 'animejs'
import PerfectScrollbar from 'react-perfect-scrollbar'

import classes from './bellBox.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import profioleLogo from '../../assets/images/profile.jpg'


const BellBox = (props) => {

    const bellBoxRef = React.useRef()

    if(props.showBellBox === true) {
        anime({
            targets: bellBoxRef.current,
            opacity: 1
        })
        
    }else{
        anime({
            targets: bellBoxRef.current,
            opacity: 0,
        })
    }

    return (
        <div ref={bellBoxRef} className={!props.showBellBox ? classes.bellBox : classes.bellBoxToggle}>
        <div className={classes.bellBoxHeader}>
            <button className={classes.bellBoxHeaderSeen}>مشاهده همه</button>
            <h5 className={classes.bellBoxHeaderTitle}>اعلانات</h5>
        </div>
        <div className={classes.bellBoxLine}></div>
        <div className={classes.bellBoxBody}>
        <PerfectScrollbar>
            <div className={classes.bellBoxBodyContainer}>
                <div className={classes.bellBoxBodyNotification}>
                    <div className={classes.bellBoxBodyNotificationDesc}>
                        <p className={classes.bellBoxBodyNotificationDescTitle}>
                            تو بهترینی روزبه شامخی
                        </p>
                        <div className={classes.bellBoxBodyNotificationDescDate}>
                            <p className={classes.bellBoxbodyNotificationDescDateText}>pm 12:05</p>
                            <FontAwesomeIcon icon={faThumbsUp}
                            className={classes.bellBoxBodyNotificationDescDateIcon}/>
                        </div>
                    </div>
                    <img src={profioleLogo} alt="profile"
                    className={classes.BellBoxBodyNotificationImage} />
                </div>
                <div className={classes.bellBoxNotificationUnderlineBox}>
                    <div className={classes.bellBoxNotificationUnderline}></div>
                </div>
            </div>

            <div className={classes.bellBoxBodyContainer}>
                <div className={classes.bellBoxBodyNotification}>
                    <div className={classes.bellBoxBodyNotificationDesc}>
                        <p className={classes.bellBoxBodyNotificationDescTitle}>
                            تو بهترینی روزبه شامخی
                        </p>
                        <div className={classes.bellBoxBodyNotificationDescDate}>
                            <p className={classes.bellBoxbodyNotificationDescDateText}>pm 12:05</p>
                            <FontAwesomeIcon icon={faThumbsUp}
                            className={classes.bellBoxBodyNotificationDescDateIcon}/>
                        </div>
                    </div>
                    <img src={profioleLogo} alt="profile"
                    className={classes.BellBoxBodyNotificationImage} />
                </div>
                <div className={classes.bellBoxNotificationUnderlineBox}>
                    <div className={classes.bellBoxNotificationUnderline}></div>
                </div>
            </div>

            <div className={classes.bellBoxBodyContainer}>
                <div className={classes.bellBoxBodyNotification}>
                    <div className={classes.bellBoxBodyNotificationDesc}>
                        <p className={classes.bellBoxBodyNotificationDescTitle}>
                            تو بهترینی روزبه شامخی
                        </p>
                        <div className={classes.bellBoxBodyNotificationDescDate}>
                            <p className={classes.bellBoxbodyNotificationDescDateText}>pm 12:05</p>
                            <FontAwesomeIcon icon={faThumbsUp}
                            className={classes.bellBoxBodyNotificationDescDateIcon}/>
                        </div>
                    </div>
                    <img src={profioleLogo} alt="profile"
                    className={classes.BellBoxBodyNotificationImage} />
                </div>
                <div className={classes.bellBoxNotificationUnderlineBox}>
                    <div className={classes.bellBoxNotificationUnderline}></div>
                </div>
            </div>

            <div className={classes.bellBoxBodyContainer}>
                <div className={classes.bellBoxBodyNotification}>
                    <div className={classes.bellBoxBodyNotificationDesc}>
                        <p className={classes.bellBoxBodyNotificationDescTitle}>
                            تو بهترینی روزبه شامخی
                        </p>
                        <div className={classes.bellBoxBodyNotificationDescDate}>
                            <p className={classes.bellBoxbodyNotificationDescDateText}>pm 12:05</p>
                            <FontAwesomeIcon icon={faThumbsUp}
                            className={classes.bellBoxBodyNotificationDescDateIcon}/>
                        </div>
                    </div>
                    <img src={profioleLogo} alt="profile"
                    className={classes.BellBoxBodyNotificationImage} />
                </div>
                <div className={classes.bellBoxNotificationUnderlineBox}>
                    <div className={classes.bellBoxNotificationUnderline}></div>
                </div>
            </div>

            <div className={classes.bellBoxBodyContainer}>
                <div className={classes.bellBoxBodyNotification}>
                    <div className={classes.bellBoxBodyNotificationDesc}>
                        <p className={classes.bellBoxBodyNotificationDescTitle}>
                            تو بهترینی روزبه شامخی
                        </p>
                        <div className={classes.bellBoxBodyNotificationDescDate}>
                            <p className={classes.bellBoxbodyNotificationDescDateText}>pm 12:05</p>
                            <FontAwesomeIcon icon={faThumbsUp}
                            className={classes.bellBoxBodyNotificationDescDateIcon}/>
                        </div>
                    </div>
                    <img src={profioleLogo} alt="profile"
                    className={classes.BellBoxBodyNotificationImage} />
                </div>
                <div className={classes.bellBoxNotificationUnderlineBox}>
                    <div className={classes.bellBoxNotificationUnderline}></div>
                </div>
            </div>
           
            </PerfectScrollbar>
        </div>
    </div>

    )
}

const mapState = state => {
    return {
        showMessageBox: state.layout.showMessageBox,
        showBellBox: state.layout.showBellBox
    }
}


export default connect(mapState)(BellBox);