import * as actionTypes from '../actionTypes/actionTypes'
// import axios from 'axios'
import axiosConfig from '../../axiosConfigure/axiosConfig'
import anime from 'animejs'


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const auth = (mobile, code, loginDoneAlert, history) => {
    return dispatch => {
        dispatch(authStart())

        // const authData = {
        //     email,
        //     password
        // }

        axiosConfig.post('/Account/Authenticate', {
            phoneNumber,
            smsToken,
            roleGuid: '46a09d81-c57f-4655-a8f5-027c66a6cfb1',
            rememberMe: true

        }).then(res => {
            let token = res.data.token
            console.log(token)

            if (res.data.token !== null) {
                dispatch(authSuccess(token))

                anime({
                    targets: loginDoneAlert,
                    height: '70px',
                    paddingTop: '17px',
                    top: '0',
                    display: 'fixed',
                    backgroundColor: '#43A047'
                })
                setTimeout(() => {
                    anime({
                        targets: loginDoneAlert,
                        height: '0',
                        top: '-40%',
                        display: 'none'
                    })
                }, 1500);

                // setTimeout(() => {
                //     history.replace('/')
                // }, 1300);

            } else {
                dispatch(authFail(res.data.message))
                anime({
                    targets: loginDoneAlert,
                    height: '70px',
                    paddingTop: '17px',
                    top: '0',
                    display: 'fixed',
                    backgroundColor: '#f44336'
                })
                setTimeout(() => {
                    anime({
                        targets: loginDoneAlert,
                        height: '0',
                        top: '-40%',
                        display: 'none',
                    })
                }, 4000);
            }



        }).catch(err => {
            dispatch(authFail(err.message))
            anime({
                targets: loginDoneAlert,
                height: '70px',
                paddingTop: '17px',
                top: '0',
                display: 'fixed',
                backgroundColor: '#f44336'
            })
            setTimeout(() => {
                anime({
                    targets: loginDoneAlert,
                    height: '0',
                    top: '-40%',
                    display: 'none',
                })
            }, 4000);
        })
    }

}

export const loggedOut = () => {
    return {
        type: actionTypes.LOG_OUT
    }
}