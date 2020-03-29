// this file is keep ChatPage Component and its chat component of panel in /chat route 

import React from 'react';
import PanelMainChathead from '../../panelMain/panelMainHeads/PanelMainChathead'
import PanelMain from '../../panelMain/PanelMain'
import ChatPage from '../../chatPage/ChatPage'


const ChatBox = () => {

    return(
        <PanelMain header={<PanelMainChathead />}>
            <ChatPage />
        </PanelMain>
    )
}

export default ChatBox