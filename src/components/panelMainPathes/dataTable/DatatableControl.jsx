// this file keep jsxes of table controle column  

import React from 'react'
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Tooltip} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faInfoCircle, faEdit, faBars, faMagic, faNeuter, faFan } from '@fortawesome/free-solid-svg-icons'
import { makeStyles } from '@material-ui/core/styles';

const DatatableControl = () => {

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
        <div className="dataTable-controle-icon-boxes">

                <BootstrapTooltip placement="top" title="حذف">
                    <div className="dataTable-controle-icon-box-trash" id="trashTooltip">
                        <FontAwesomeIcon icon={faTrashAlt} className="dataTable-controle-icon-trash" id="trashTooltip"/>
                    </div>
                </BootstrapTooltip>
                <BootstrapTooltip placement="top" title="اطلاعات">
                <div className="dataTable-controle-icon-box-info">
                    <FontAwesomeIcon icon={faInfoCircle} className="dataTable-controle-icon-info"/>
                </div>
                </BootstrapTooltip>

                <BootstrapTooltip placement="top" title="تغییر">
                <div className="dataTable-controle-icon-box-edit">
                    <FontAwesomeIcon icon={faEdit} className="dataTable-controle-icon-edit"/>
                </div>
                </BootstrapTooltip>

                <div className="dataTable-controle-icon-box-bars">
                    <UncontrolledDropdown setActiveFromChild>
                    <BootstrapTooltip placement="top" title="بیشتر">
                        <DropdownToggle tag="a" className="dataTable-controle-icon-box-toggler">
                            <FontAwesomeIcon icon={faBars} className="dataTable-controle-icon-edit"/>
                        </DropdownToggle>
                        </BootstrapTooltip>
                        <DropdownMenu>
                            <DropdownItem className="dataTable-controle-dropdown-item">
                                <FontAwesomeIcon icon={faMagic} className="dataTable-controle-dropdown-icon"/>
                                <span className="dataTable-controle-dropdown-text">اضاقه کردن</span>
                            </DropdownItem>
                            <DropdownItem className="dataTable-controle-dropdown-item">
                                <FontAwesomeIcon icon={faNeuter} className="dataTable-controle-dropdown-icon"/>
                                <span className="dataTable-controle-dropdown-text">حذف کردن</span>
                            </DropdownItem>
                            <DropdownItem className="dataTable-controle-dropdown-item">
                                <FontAwesomeIcon icon={faFan} className="dataTable-controle-dropdown-icon"/>
                                <span className="dataTable-controle-dropdown-text">ریست کردن</span>
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </div>
                
            </div>
    )
}

export default DatatableControl