import * as authActionCreators from '../storeConfigure/actionCreators/authActionCreators'
let axios = require('axios');

let axiosConfig = axios.create({
    baseURL: 'http://185.94.97.164/api'
});

// axiosConfig.interceptors.response.use(response => {
//     return response;
// }, error => {
//     if (error.response.status === 401) {
//         // authActionCreators.loggedOut()
//     }
//     return error;
// });

export default axiosConfig;