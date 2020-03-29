import * as acionTypes from '../actionTypes/actionTypes'

export const saveSinglePost = (postGuid) => {
    return {
        type: acionTypes.SAVE_SINGLE_POST,
        postGuid
    }
}