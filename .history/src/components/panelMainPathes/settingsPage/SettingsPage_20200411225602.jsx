// this file is settings component of panel in /settings route

import React from 'react';
import PanelMainSettingshead from '../../panelMain/panelMainHeads/PanelMainSettingshead'
import PanelMain from '../../panelMain/PanelMain';
import './settingsPage.css'

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import HomeIcon from '@material-ui/icons/Home';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import PeopleIcon from '@material-ui/icons/People';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import DnsIcon from '@material-ui/icons/Dns';
import DashboardIcon from '@material-ui/icons/Dashboard';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBars, faCog } from '@fortawesome/free-solid-svg-icons'



function TabPanel(props) {
    const { children, value, index, ...other } = props;
return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      width: 'calc(100% + 30px)',
      marginLeft: '-15px',
      marginTop: '-15px',
      backgroundColor: theme.palette.background.paper,
      fontFamily: 'Yekan'
    },
    body: {
        fontFamily: 'Yekan'
    }
  }));

function SettingsPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let variable
  if(window.innerWidth > 1400) {
      variable = "scrollable"
  }else{
      variable = "scrollable"
  }

// render() {
    return (
        <PanelMain header={<PanelMainSettingshead />} >

          <div className={classes.root} dir="rtl">
            <AppBar position="static" color="default">
              <Tabs
                // centered
                value={value}
                onChange={handleChange}
                variant= {variable}
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                aria-label="scrollable force tabs"
              >
                <Tab label="اصلی" icon={<HomeIcon />} {...a11yProps(0)} />
                <Tab label="صفحات" icon={<ImportContactsIcon />} {...a11yProps(1)} />
                <Tab label="کاربران" icon={<PeopleIcon />} {...a11yProps(2)} />
                <Tab label="شبکه" icon={<SettingsInputAntennaIcon />} {...a11yProps(3)} />
                <Tab label="سرور" icon={<DnsIcon />} {...a11yProps(4)} />
                <Tab label="پنل" icon={<DashboardIcon />} {...a11yProps(5)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
            <div className="layout-nav-setting-box-item">
              <div className="layout-nav-setting-box-item-left">
                  <div className="layout-nav-setting-box-item-left-plusbox">
                  <FontAwesomeIcon icon={faPlus} className="layout-nav-setting-box-item-left-plus"/>
                  </div>
                  <div className="layout-nav-setting-box-item-left-menubox">
                  <FontAwesomeIcon icon={faBars} className="layout-nav-setting-box-item-left-menu"/>
                  </div>
              </div>
              <div className="layout-nav-setting-box-item-right">
              <FontAwesomeIcon icon={faCog} className="layout-nav-setting-box-item-right-icon"/>
                  <p className="layout-nav-setting-box-item-right-text">دسته بندی</p>
              </div>
          </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              دسترسی ندارید
            </TabPanel>
            <TabPanel value={value} index={2}>
            <div className="layout-nav-setting-box-item">
              <div className="layout-nav-setting-box-item-left">
                  <div className="layout-nav-setting-box-item-left-plusbox">
                  <FontAwesomeIcon icon={faPlus} className="layout-nav-setting-box-item-left-plus"/>
                  </div>
                  <div className="layout-nav-setting-box-item-left-menubox">
                  <FontAwesomeIcon icon={faBars} className="layout-nav-setting-box-item-left-menu"/>
                  </div>
              </div>
              <div className="layout-nav-setting-box-item-right">
              <FontAwesomeIcon icon={faCog} className="layout-nav-setting-box-item-right-icon"/>
                  <p className="layout-nav-setting-box-item-right-text">محل اصلی</p>
              </div>
          </div>
            </TabPanel>
            <TabPanel value={value} index={3}>
            <div className="layout-nav-setting-box-item">
              <div className="layout-nav-setting-box-item-left">
                  <div className="layout-nav-setting-box-item-left-plusbox">
                  <FontAwesomeIcon icon={faPlus} className="layout-nav-setting-box-item-left-plus"/>
                  </div>
                  <div className="layout-nav-setting-box-item-left-menubox">
                  <FontAwesomeIcon icon={faBars} className="layout-nav-setting-box-item-left-menu"/>
                  </div>
              </div>
              <div className="layout-nav-setting-box-item-right">
              <FontAwesomeIcon icon={faCog} className="layout-nav-setting-box-item-right-icon"/>
                  <p className="layout-nav-setting-box-item-right-text">محل اصلی</p>
              </div>
          </div>
          <div className="layout-nav-setting-box-item">
              <div className="layout-nav-setting-box-item-left">
                  <div className="layout-nav-setting-box-item-left-plusbox">
                  <FontAwesomeIcon icon={faPlus} className="layout-nav-setting-box-item-left-plus"/>
                  </div>
                  <div className="layout-nav-setting-box-item-left-menubox">
                  <FontAwesomeIcon icon={faBars} className="layout-nav-setting-box-item-left-menu"/>
                  </div>
              </div>
              <div className="layout-nav-setting-box-item-right">
              <FontAwesomeIcon icon={faCog} className="layout-nav-setting-box-item-right-icon"/>
                  <p className="layout-nav-setting-box-item-right-text">محل اصلی</p>
              </div>
          </div>
            </TabPanel>
            <TabPanel value={value} index={4}>
              دسترسی ندارید
            </TabPanel>
            <TabPanel value={value} index={5}>
            <div className="layout-nav-setting-box-item">
              <div className="layout-nav-setting-box-item-left">
                  <div className="layout-nav-setting-box-item-left-plusbox">
                  <FontAwesomeIcon icon={faPlus} className="layout-nav-setting-box-item-left-plus"/>
                  </div>
                  <div className="layout-nav-setting-box-item-left-menubox">
                  <FontAwesomeIcon icon={faBars} className="layout-nav-setting-box-item-left-menu"/>
                  </div>
              </div>
              <div className="layout-nav-setting-box-item-right">
              <FontAwesomeIcon icon={faCog} className="layout-nav-setting-box-item-right-icon"/>
                  <p className="layout-nav-setting-box-item-right-text">محل اصلی</p>
              </div>
          </div>
            </TabPanel>
          </div>

        </PanelMain>
    )
}
    
// }

export default SettingsPage