import * as actionTypes from '../actionTypes/actionTypes'

export const showAddModal = () => {
    return {
        type: actionTypes.SHOW_ADD_MODAL
    }
}

export const hideAddModal = () => {
    return {
        type: actionTypes.HIDE_ADD_MODAL
    }
}

export const sendCategoryTitle = (categoryTitle, categoryGuid) => {
    return {
        type: actionTypes.SEND_CAT_TITLE,
        categoryTitle,
        categoryGuid
    }
}