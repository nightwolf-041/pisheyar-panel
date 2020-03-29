import * as actionTypes from '../actionTypes/actionTypes'
import utility from '../utility'

const initState = {
    showAddModal: false,
    categoryTitle: '',
    categoryGuid: ''
}

const mainListReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_ADD_MODAL:
            return utility(state, { showAddModal: true })

        case actionTypes.HIDE_ADD_MODAL:
            return utility(state, { showAddModal: false })

        case actionTypes.SEND_CAT_TITLE:
            return utility(state, {
                categoryTitle: action.categoryTitle,
                categoryGuid: action.categoryGuid
            })

        default:
            return state
    }
}

export default mainListReducer