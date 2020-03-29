import React from 'react';
import { connect } from 'react-redux'
import classes from './layoutBackdrop.module.css'

const LayoutBackdrop = (props) => {
    return (
        <div className={props.showHamburger ?
            classes.layoutBackdropToggle :
            classes.layoutBackdrop}
            onClick={props.clicked}></div>
    )
}

const mapState = state => {
    return {
        showHamburger: state.layout.showHamburger
    }
}

export default connect(mapState)(LayoutBackdrop);
