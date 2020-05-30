// this file is parent component of project includes routes

import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { CounterProvider } from '../components/Counter'
import './app.css'

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