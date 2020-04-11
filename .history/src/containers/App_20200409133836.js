// this file is parent component of project includes routes

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  direction: 'rtl'
});


import React, { Suspense } from 'react';
import {connect} from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import './app.css'

import routs from './routs'
import Panel from './Panel'
import LoginPage from '../components/loginPage/LoginPage'


function App(props) {
  console.log(props.token);
  return (
    <>
    {props.token === null ?
      <LoginPage />
      :
      <BrowserRouter>
        
          <Panel>
            <Suspense fallback={<div className="lds-dual-ring"></div>}>
              <Switch>
                {routs.map((rout, index) => (
                  <Route {...rout} key={index} />
                ))}
               </Switch>
            </Suspense>
          </Panel>
       
      </BrowserRouter>
    }
    </>
  );
}

const mapState = state => {
  return {
    token: state.authReducer.token
  }
}


export default connect(mapState)(App)