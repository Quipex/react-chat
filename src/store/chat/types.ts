import {Message} from '../../chat/model/Message';
import {User} from '../../chat/model/User';
import {Chat} from '../../chat/model/Chat';

export const SEND_MESSAGE = 'CHAT:SEND_MESSAGE';
export const DELETE_MESSAGE = 'CHAT:DELETE_MESSAGE';
export const SET_EDITED_MESSAGE = 'CHAT:SET_EDITED_MESSAGE';
export const EDIT_MESSAGE = 'CHAT:EDIT_MESSAGE';
export const LIKE_MESSAGE = 'CHAT:LIKE_MESSAGE';
export const CONFIGURE_MESSAGE = 'CHAT:CONFIGURE_MESSAGE';
export const SET_CONFIGURED_MESSAGE = 'CHAT:SET_CONFIGURED_MESSAGE';
export const LOAD_CHAT = 'CHAT:LOAD';

export interface ChatState {
    chatId: string,
    chatName: string,
    users: Array<User>,
    messages: Array<Message>,
    editedMessage?: Message,
    configuredMessage?: Message
}

interface SendMessageAction {
    type: typeof SEND_MESSAGE
    payload: Message
}

interface DeleteMessageAction {
    type: typeof DELETE_MESSAGE
    messageId: string
}

interface SetEditedMessageAction {
    type: typeof SET_EDITED_MESSAGE,
    message: Message | undefined
}

interface EditMessageAction {
    type: typeof EDIT_MESSAGE
    payload: Message
}

interface LikeMessageAction {
    type: typeof LIKE_MESSAGE
    messageId: string
}

interface SetConfiguredMessageAction {
    type: typeof SET_CONFIGURED_MESSAGE
    message: Message | undefined
}

interface ConfigureMessageAction {
    type: typeof CONFIGURE_MESSAGE
    payload: Message
}

interface LoadChatAction {
    type: typeof LOAD_CHAT
    chat: Chat
}

export type ChatActionTypes = SendMessageAction | DeleteMessageAction | EditMessageAction | LikeMessageAction |
    SetEditedMessageAction | SetConfiguredMessageAction | ConfigureMessageAction | LoadChatAction;
