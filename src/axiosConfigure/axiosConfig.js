var axios = require('axios');

var axiosConfig = axios.create({
    baseURL: 'http://185.94.97.164/api',
    /* other custom settings */
});

module.exports = axiosConfig;