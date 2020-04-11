// this container is layout of dashboard and wrap main between header and sidebar 

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import React from 'react';
import {connect} from 'react-redux'
import * as layoutActionCreators from '../storeConfigure/actionCreators/layoutActionCreators'

import 'react-perfect-scrollbar/dist/css/styles.css';
import './panel.css';

import PanelHeader from '../components/panelHeader/PanelHeader'
import MessageBox from '../components/messageBox/MessageBox'
import BellBox from '../components/bellBox/BellBox'
import PanelSidebar from '../components/panelSidebar/PanelSidebar'
import LayoutBackdrop from '../components/UI/layoutBackdrop/LayoutBackdrop';

function Panel(props) {

  const theme = createMuiTheme({
    direction: 'rtl'
  });


  return (
      <React.Fragment>
         {props.showHamburger ? <LayoutBackdrop clicked={props.onHideHamburger} /> : null}
          {props.showChatHamburger ? <div className="chatpageoverlay"
          onClick={props.onHideChatHamburger}></div> : null}

        <MessageBox/>
        <BellBox/>
        <PanelHeader />
        <ThemeProvider theme={theme}>
          <div dir="rtl">
            {props.children}
          </div>
        </ThemeProvider>
        <PanelSidebar />

      </React.Fragment>
  );
}

const mapState = state => {
  return {
    showHamburger: state.layout.showHamburger,
    showChatHamburger: state.layout.showChatHamburger
  }
}

const mapDispatch = dispatch => {
  return {
      onHideHamburger: () => dispatch(layoutActionCreators.hideHamburger()),
      onHideChatHamburger: () => dispatch(layoutActionCreators.hideChatHamburger())
  }
}



export default connect(mapState, mapDispatch)(Panel);
