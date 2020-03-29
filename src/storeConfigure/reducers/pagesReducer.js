import * as actionTypes from '../actionTypes/actionTypes'
import utility from '../utility'

const initialState = {
    postGuid: null
}

const pagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SAVE_SINGLE_POST:
            return utility(state, { postGuid: action.postGuid })
                // break;

        default:
            return state;
    }
}

export default pagesReducer;