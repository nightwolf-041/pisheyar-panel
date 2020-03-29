// this file is header of panel main (/settings route) 

import React from 'react';
import { Tooltip} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import classes from '../panelMain.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faEllipsisV, faCloudDownloadAlt } from '@fortawesome/free-solid-svg-icons'


const PanelMainCategorieshead = (props) => {

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
                        {props.title}
                    </h5>
                    <p className={classes.mainSectionHeaderSubtitle}></p>
                </div>
                <div className={classes.mainSectionHeaderIcons}>
                    <BootstrapTooltip placement="right" title="افزودن">
                        <div>
                        <FontAwesomeIcon icon={faPlus}
                            className={classes.mainSectionHeaderIcon}/>
                        </div>
                    </BootstrapTooltip>

                    <FontAwesomeIcon icon={faEllipsisV}
                        className={classes.mainSectionHeaderIcon}
                        onClick={props.clicked} />
                </div>
            </div>

            <div className={!props.showMainHeaderModal ?
                classes.mainSectionHeaderDropdown :
                classes.mainSectionHeaderDropdownToggle}>
                <div className={classes.mainSectionHeaderDropdownItem}>
                    <FontAwesomeIcon icon={faCloudDownloadAlt}
                        className={classes.mainSectionHeaderDropdownItemIcon} />
                    <button className={classes.mainSectionHeaderDropdownItemText}>
                        تمام کارمندان
                    </button>
                </div>
                <div className={classes.mainSectionHeaderDropdownItem}>
                    <FontAwesomeIcon icon={faCloudDownloadAlt}
                        className={classes.mainSectionHeaderDropdownItemIcon} />
                    <button className={classes.mainSectionHeaderDropdownItemText}>
                        تمام مدیران
                    </button>
                </div>
                <div className={classes.mainSectionHeaderDropdownItem}>
                    <FontAwesomeIcon icon={faCloudDownloadAlt}
                        className={classes.mainSectionHeaderDropdownItemIcon} />
                    <button className={classes.mainSectionHeaderDropdownItemText}>
                        تمام کاربران
                    </button>
                </div>
            </div>
        </>
    )
}


// const mapState = state => {
//     return {
//         title: state.list.categoryTitle
//     }
// }

export default PanelMainCategorieshead