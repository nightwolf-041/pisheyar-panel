import * as actionTypes from '../actionTypes/actionTypes'
import utility from '../utility'

const initialState = {
    loading: false,
    token: null,
    error: false,
    errorMsg: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return utility(state, { loading: true, token: null, error: false, errorMsg: null })

        case actionTypes.AUTH_SUCCESS:
            return utility(state, { loading: false, token: action.token, error: false, errorMsg: null })

        case actionTypes.AUTH_FAIL:
            return utility(state, { loading: false, token: null, error: true, errorMsg: action.error })

        case actionTypes.LOG_OUT:
            return utility(state, { loading: false, token: null, error: false, errorMsg: null })

        default:
            return state;
    }
}

export default authReducer