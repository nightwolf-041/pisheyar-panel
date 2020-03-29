import * as actionTypes from '../actionTypes/actionTypes'

export const showHamburger = () => {
    return {
        type: actionTypes.SHOW_HAMBURGER
    }
}
export const hideHamburger = () => {
    return {
        type: actionTypes.HIDE_HAMBURGER
    }
}

// message and bell 
export const showMessageBox = () => {
    return {
        type: actionTypes.SHOW_MESSAGEBOX
    }
}
export const hideMessageBox = () => {
    return {
        type: actionTypes.HIDE_MESSAGEBOX
    }
}

export const showBellBox = () => {
    return {
        type: actionTypes.SHOW_BELLBOX
    }
}
export const hideBellBox = () => {
    return {
        type: actionTypes.HIDE_BELLBOX
    }
}

// sidebar top modal 
export const showSettingDrop = () => {
    return {
        type: actionTypes.SHOW_SETTING_DROP
    }
}
export const hideSettingDrop = () => {
    return {
        type: actionTypes.HIDE_SETTING_DROP
    }
}

// main modals 
export const showMainHeaderModal = () => {
    return {
        type: actionTypes.SHOW_MAIN_HEADER_MODAL
    }
}
export const hideMainHeaderModal = () => {
    return {
        type: actionTypes.HIDE_MAIN_HEADER_MODAL
    }
}

// chat page

export const showChatHamburger = () => {
    return {
        type: actionTypes.SHOW_CHAT_HAMBURGER
    }
}

export const hideChatHamburger = () => {
    return {
        type: actionTypes.HIDE_CHAT_HAMBURGER
    }
}