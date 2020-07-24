import {
    ChatActionTypes,
    ChatState,
    CONFIGURE_MESSAGE,
    DELETE_MESSAGE,
    EDIT_MESSAGE,
    LIKE_MESSAGE,
    LOAD_CHAT,
    SEND_MESSAGE,
    SET_CONFIGURED_MESSAGE,
    SET_EDITED_MESSAGE
} from './types';

export default (state: ChatState = {chatId: '', chatName: '', messages: [], users: []}, action: ChatActionTypes) => {
    switch (action.type) {
        case LOAD_CHAT:
            return {
                chatId: action.chat.id,
                chatName: action.chat.name,
                messages: action.chat.messages,
                users: action.chat.users
            };
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };
        case DELETE_MESSAGE:
            return {
                ...state,
                messages: state.messages.filter(m => (m.id !== action.messageId))
            };
        case SET_EDITED_MESSAGE:
            return {
                ...state,
                editedMessage: action.message
            };
        case EDIT_MESSAGE:
            return {
                ...state,
                messages: state.messages.map(m => {
                    if (m.id === action.payload.id) {
                        return action.payload;
                    }
                    return m;
                })
            };
        case SET_CONFIGURED_MESSAGE:
            return {
                ...state,
                configuredMessage: action.message
            };
        case CONFIGURE_MESSAGE:
            return {
                ...state,
                messages: state.messages.map(m => {
                    if (m.id === action.payload.id) {
                        return action.payload;
                    }
                    return m;
                })
            };
        case LIKE_MESSAGE:
            return {
                ...state,
                messages: state.messages.map(m => {
                    if (m.id === action.messageId) {
                        m.isLiked = !m.isLiked;
                    }
                    return m;
                })
            };
        default:
            return state;
    }
}
