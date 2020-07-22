import {v4 as uuidv4} from 'uuid';
import {mockedMessages, mockedUsers} from './messages-mock';
import {Chat} from '../model/Chat';
import {getMessages} from '../service/MessagesService';

export async function chatMock(): Promise<Chat> {
    const chatId = uuidv4();
    const chatName = 'My Test chat {' + chatId + '}';
    const msgs = await getMessages(chatId);
    const messages = mockedMessages(msgs);
    const users = mockedUsers(messages);
    return {id: chatId, name: chatName, messages, users}
}
