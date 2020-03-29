import * as actionTypes from '../actionTypes/actionTypes'
import utility from '../utility'

const initialState = {
    showHamburger: false,
    showMessageBox: false,
    showBellBox: false,

    showSettingDropdown: false,

    showMainHeaderModal: false,

    headerHideothers: false,

    showChatHamburger: false
}

const layoutReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.SHOW_HAMBURGER:
            return utility(state, { showHamburger: true, showBellBox: false, showMessageBox: false })

        case actionTypes.HIDE_HAMBURGER:
            return utility(state, { showHamburger: false })

            // message and bell box 
        case actionTypes.SHOW_MESSAGEBOX:
            return utility(state, { showMessageBox: !state.showMessageBox, showBellBox: false })

        case actionTypes.HIDE_MESSAGEBOX:
            return utility(state, { showMessageBox: false })

        case actionTypes.SHOW_BELLBOX:
            return utility(state, { showBellBox: !state.showBellBox, showMessageBox: false })

        case actionTypes.HIDE_BELLBOX:
            return utility(state, { showBellBox: false })

            // side bar top modal 
        case actionTypes.SHOW_SETTING_DROP:
            return utility(state, { showSettingDropdown: !state.showSettingDropdown })
        case actionTypes.HIDE_SETTING_DROP:
            return utility(state, { showSettingDropdown: false })

            // hide main header modal
        case actionTypes.SHOW_MAIN_HEADER_MODAL:
            return utility(state, { showMainHeaderModal: !state.showMainHeaderModal })

        case actionTypes.HIDE_MAIN_HEADER_MODAL:
            return utility(state, { showMainHeaderModal: false })

            // chat page 

        case actionTypes.SHOW_CHAT_HAMBURGER:
            return utility(state, { showChatHamburger: true })

        case actionTypes.HIDE_CHAT_HAMBURGER:
            return utility(state, { showChatHamburger: false })



        default:
            return state;
    }
}

export default layoutReducer;