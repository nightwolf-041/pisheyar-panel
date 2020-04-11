// this container is layout of dashboard and wrap main between header and sidebar 

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

import RTL from '../utils/RTL'

function Panel(props) {

  return (
    <RTL>
      {/* <React.Fragment> */}
         {props.showHamburger ? <LayoutBackdrop clicked={props.onHideHamburger} /> : null}
          {props.showChatHamburger ? <div className="chatpageoverlay"
          onClick={props.onHideChatHamburger}></div> : null}

        <MessageBox/>
        <BellBox/>
        <PanelHeader />
        {props.children}
        <PanelSidebar />

      {/* </React.Fragment> */}
      </RTL>
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
