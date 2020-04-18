// this file is rendering main component of project and configure store to this 

import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme } from "@material-ui/core/styles";
import { StylesProvider, ThemeProvider, jssPreset } from "@material-ui/styles";
import { create } from "jss";
import rtl from "jss-rtl";
import axiosConfig from './axiosConfigure/axiosConfig'
import * as authActionCreators from './storeConfigure/actionCreators/authActionCreators'

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import layuotReducer from './storeConfigure/reducers/layoutReducer'
import mainListReducer from './storeConfigure/reducers/mainListReducer'
import authReducer from './storeConfigure/reducers/authReducer'
import pagesReducer from './storeConfigure/reducers/pagesReducer'

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@material-ui/icons/Clear'

const rootReducer = combineReducers({
    list: mainListReducer,
    layout: layuotReducer,
    authReducer: authReducer,
    pages: pagesReducer
})

// const persistConfig = {
//     key: 'root',
//     storage,
//     blacklist: ['layout']
// }

const persistConfig2 = {
    key: 'root۲',
    storage,
}

const persistedReducer = persistReducer(persistConfig2, rootReducer)
let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)))
store.subscribe(() => {
    store.getState();
});
let persistor = persistStore(store)

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
// store.subscribe(() => {
//     store.getState();
// });

// const {dispatch} = reduxStore;
axiosConfig.interceptors.response.use(response => {
    console.log(response);
  return response;
}, error => {
  if (error.response.status === 401) {
    store.dispatch(authActionCreators.loggedOut())
  }
  return error;
});

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const theme = createMuiTheme({
    direction: "rtl"
});

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<p>صبور باشید</p>} persistor={persistor}>
            <StylesProvider jss={jss}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </StylesProvider>
        </PersistGate>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
