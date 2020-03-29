// this file is message box of main layout .... its icon in main header 

import React from 'react';
import anime from 'animejs'
import {connect} from 'react-redux'
import PerfectScrollbar from 'react-perfect-scrollbar'

import classes from './messageBox.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply, faBookReader } from '@fortawesome/free-solid-svg-icons'

import profileLogo from '../../assets/images/profile.jpg'

const MessageBox = (props) => {
    const messageBoxRef = React.useRef()

    if(props.showMessageBox === true) {
        anime({
            targets: messageBoxRef.current,
            opacity: 1,
            position: 'absolute'
        })
    }else{
        anime({
            targets: messageBoxRef.current,
            opacity: 0,
            position: 'absolute'
        })
    }

    return (
        <div ref={messageBoxRef} className={!props.showMessageBox ? classes.messageBox : classes.messageBoxToggle}>
            <div className={classes.messageBoxHeader}>
                <button className={classes.messageBoxHeaderSeen}>مشاهده همه</button>
                <h5 className={classes.messageBoxHeaderTitle}>پیام ها</h5>
            </div>
            <div className={classes.messageBoxLine}></div>
            <div className={classes.messageBoxEmpty}>
            </div>
            <div className={props.showMessageBox ? classes.messageBoxBodyToggle : classes.messageBoxBody}>
            <PerfectScrollbar>
                <div className={classes.messageBoxBodyContainer}>
                    <div className={classes.messageBoxMessages}>
                        <div className={classes.messageBoxMessagesDesc}>
                            <div className={classes.messageBoxMessagesTop}>
                                <div className={classes.messageBoxMessagesTopDate}>1396/5/15</div>
                                <div className={classes.messageBoxMessagesTopTitle}>محمد میرزایی</div>
                            </div>
                            <div className={classes.messageBoxMessagesMiddle}>
                                <p className={classes.messageBoxMessagesMiddleText}>
                                    امشب دل من هوس رطب کرده
                            </p>
                            </div>
                        </div>
                        <img src={profileLogo} alt="profile"
                        className={classes.messageBoxMessagesImage} />
                    </div>
                    <div className={classes.messageBoxMessagesBottom}>
                        <div className={classes.messageBoxMessagesBottomReply}>
                        <FontAwesomeIcon icon={faReply} className={classes.messageBoxMessagesBottomReplyIcon}/>
                            <p className={classes.messageBoxMessagesBottomReplyText}>پاسخ</p>
                        </div>
                        <div className={classes.messageBoxMessagesBottomRead}>
                        <FontAwesomeIcon icon={faBookReader} className={classes.messageBoxMessagesBottomReadIcon}/>
                            <p className={classes.messageBoxMessagesBottomReadText}>خوانده شده</p>
                        </div>
                    </div>
                    <div className={classes.messageBoxMessageUnderlineBox}>
                        <div className={classes.messageBoxMessageUnderline}></div>
                    </div>
                </div>

                <div className={classes.messageBoxBodyContainer}>
                    <div className={classes.messageBoxMessages}>
                        <div className={classes.messageBoxMessagesDesc}>
                            <div className={classes.messageBoxMessagesTop}>
                                <div className={classes.messageBoxMessagesTopDate}>1396/5/15</div>
                                <div className={classes.messageBoxMessagesTopTitle}>محمد میرزایی</div>
                            </div>
                            <div className={classes.messageBoxMessagesMiddle}>
                                <p className={classes.messageBoxMessagesMiddleText}>
                                    امشب دل من هوس رطب کرده
                            </p>
                            </div>
                        </div>
                        <img src={profileLogo} alt="profile"
                        className={classes.messageBoxMessagesImage} />
                    </div>
                    <div className={classes.messageBoxMessagesBottom}>
                        <div className={classes.messageBoxMessagesBottomReply}>
                        <FontAwesomeIcon icon={faReply} className={classes.messageBoxMessagesBottomReplyIcon}/>
                            <p className={classes.messageBoxMessagesBottomReplyText}>پاسخ</p>
                        </div>
                        <div className={classes.messageBoxMessagesBottomRead}>
                        <FontAwesomeIcon icon={faBookReader} className={classes.messageBoxMessagesBottomReadIcon}/>
                            <p className={classes.messageBoxMessagesBottomReadText}>خوانده شده</p>
                        </div>
                    </div>
                    <div className={classes.messageBoxMessageUnderlineBox}>
                        <div className={classes.messageBoxMessageUnderline}></div>
                    </div>
                </div>

                <div className={classes.messageBoxBodyContainer}>
                    <div className={classes.messageBoxMessages}>
                        <div className={classes.messageBoxMessagesDesc}>
                            <div className={classes.messageBoxMessagesTop}>
                                <div className={classes.messageBoxMessagesTopDate}>1396/5/15</div>
                                <div className={classes.messageBoxMessagesTopTitle}>محمد میرزایی</div>
                            </div>
                            <div className={classes.messageBoxMessagesMiddle}>
                                <p className={classes.messageBoxMessagesMiddleText}>
                                    امشب دل من هوس رطب کرده
                            </p>
                            </div>
                        </div>
                        <img src={profileLogo} alt="profile"
                        className={classes.messageBoxMessagesImage} />
                    </div>
                    <div className={classes.messageBoxMessagesBottom}>
                        <div className={classes.messageBoxMessagesBottomReply}>
                        <FontAwesomeIcon icon={faReply} className={classes.messageBoxMessagesBottomReplyIcon}/>
                            <p className={classes.messageBoxMessagesBottomReplyText}>پاسخ</p>
                        </div>
                        <div className={classes.messageBoxMessagesBottomRead}>
                        <FontAwesomeIcon icon={faBookReader} className={classes.messageBoxMessagesBottomReadIcon}/>
                            <p className={classes.messageBoxMessagesBottomReadText}>خوانده شده</p>
                        </div>
                    </div>
                    <div className={classes.messageBoxMessageUnderlineBox}>
                        <div className={classes.messageBoxMessageUnderline}></div>
                    </div>
                </div>

                <div className={classes.messageBoxBodyContainer}>
                    <div className={classes.messageBoxMessages}>
                        <div className={classes.messageBoxMessagesDesc}>
                            <div className={classes.messageBoxMessagesTop}>
                                <div className={classes.messageBoxMessagesTopDate}>1396/5/15</div>
                                <div className={classes.messageBoxMessagesTopTitle}>محمد میرزایی</div>
                            </div>
                            <div className={classes.messageBoxMessagesMiddle}>
                                <p className={classes.messageBoxMessagesMiddleText}>
                                    امشب دل من هوس رطب کرده
                            </p>
                            </div>
                        </div>
                        <img src={profileLogo} alt="profile"
                        className={classes.messageBoxMessagesImage} />
                    </div>
                    <div className={classes.messageBoxMessagesBottom}>
                        <div className={classes.messageBoxMessagesBottomReply}>
                        <FontAwesomeIcon icon={faReply} className={classes.messageBoxMessagesBottomReplyIcon}/>
                            <p className={classes.messageBoxMessagesBottomReplyText}>پاسخ</p>
                        </div>
                        <div className={classes.messageBoxMessagesBottomRead}>
                        <FontAwesomeIcon icon={faBookReader} className={classes.messageBoxMessagesBottomReadIcon}/>
                            <p className={classes.messageBoxMessagesBottomReadText}>خوانده شده</p>
                        </div>
                    </div>
                    <div className={classes.messageBoxMessageUnderlineBox}>
                        <div className={classes.messageBoxMessageUnderline}></div>
                    </div>
                </div>

                <div className={classes.messageBoxBodyContainer}>
                    <div className={classes.messageBoxMessages}>
                        <div className={classes.messageBoxMessagesDesc}>
                            <div className={classes.messageBoxMessagesTop}>
                                <div className={classes.messageBoxMessagesTopDate}>1396/5/15</div>
                                <div className={classes.messageBoxMessagesTopTitle}>محمد میرزایی</div>
                            </div>
                            <div className={classes.messageBoxMessagesMiddle}>
                                <p className={classes.messageBoxMessagesMiddleText}>
                                    امشب دل من هوس رطب کرده
                            </p>
                            </div>
                        </div>
                        <img src={profileLogo} alt="profile"
                        className={classes.messageBoxMessagesImage} />
                    </div>
                    <div className={classes.messageBoxMessagesBottom}>
                        <div className={classes.messageBoxMessagesBottomReply}>
                        <FontAwesomeIcon icon={faReply} className={classes.messageBoxMessagesBottomReplyIcon}/>
                            <p className={classes.messageBoxMessagesBottomReplyText}>پاسخ</p>
                        </div>
                        <div className={classes.messageBoxMessagesBottomRead}>
                        <FontAwesomeIcon icon={faBookReader} className={classes.messageBoxMessagesBottomReadIcon}/>
                            <p className={classes.messageBoxMessagesBottomReadText}>خوانده شده</p>
                        </div>
                    </div>
                    <div className={classes.messageBoxMessageUnderlineBox}>
                        <div className={classes.messageBoxMessageUnderline}></div>
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

export default connect(mapState)(MessageBox);