import React from 'react';
// import PanelMain from '../panelMain/PanelMain'
import classes from './notfound.module.css';

const notFound = () => {
    return(
        <div className={classes.notfoundMain}>
            <div className={classes.notfoundBody}>
                <h4>صفحه مورد نظر یافت نشد</h4>
                <p>لطفا از منوی سمت راست کمک بگیرید</p>
            </div>
        </div>
    )
}

export default notFound