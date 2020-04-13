import * as authActionCreators from '../storeConfigure/actionCreators/authActionCreators'

var axios = require('axios');

var axiosConfig = axios.create({
    baseURL: 'http://185.94.97.164/api',
    /* other custom settings */
});

axiosConfig.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        authActionCreators.loggedOut()
    }
    return error;
});

module.exports = axiosConfig;