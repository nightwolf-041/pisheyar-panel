import * as authActionCreators from '../storeConfigure/actionCreators/authActionCreators'
// var loggedOut = require('../storeConfigure/actionCreators/authActionCreators')
let axios = require('axios');

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        authActionCreators.loggedOut()
    }
    return error;
});

let axiosConfig = axios.create({
    baseURL: 'http://185.94.97.164/api',
    /* other custom settings */
});



export default axiosConfig;