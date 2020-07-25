import {Message} from '../../chat/model/Message';
import {
    ChatActionTypes,
    CONFIGURE_MESSAGE,
    DELETE_MESSAGE,
    EDIT_MESSAGE,
    LIKE_MESSAGE,
    LOAD_CHAT,
    SEND_MESSAGE,
    SET_CONFIGURED_MESSAGE,
    SET_EDITED_MESSAGE
} from './types';
import {Chat} from '../../chat/model/Chat';

export function sendMessage(newMessage: Message): ChatActionTypes {
    return {
        type: SEND_MESSAGE,
        payload: newMessage
    }
}

export function deleteMessage(messageId: string): ChatActionTypes {
    return {
        type: DELETE_MESSAGE,
        messageId
    }
}

export function setEditedMessage(editedMessage: Message | undefined): ChatActionTypes {
    return {
        type: SET_EDITED_MESSAGE,
        message: editedMessage
    }
}

export function editMessage(editedMessage: Message): ChatActionTypes {
    return {
        type: EDIT_MESSAGE,
        payload: editedMessage
    }
}

export function likeMessage(messageId: string): ChatActionTypes {
    return {
        type: LIKE_MESSAGE,
        messageId
    }
}

export function configureMessage(configuredMessage: Message): ChatActionTypes {
    return {
        type: CONFIGURE_MESSAGE,
        payload: configuredMessage
    }
}

export function setConfiguredMessage(configuredMessage: Message | undefined): ChatActionTypes {
    return {
        type: SET_CONFIGURED_MESSAGE,
        message: configuredMessage
    }
}

export function loadChat(chat: Chat): ChatActionTypes {
    return {
        type: LOAD_CHAT,
        chat
    }
}
