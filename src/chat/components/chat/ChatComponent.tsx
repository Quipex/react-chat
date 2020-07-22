import React, {useCallback, useState} from 'react';
import './styles.module.scss'
import {Header} from '../header/Header';
import {MessageFeed} from '../messageFeed/MessageFeed';
import {MessageInput} from '../message-input/MessageInput';
import {Chat} from '../../model/Chat';
import {Message} from '../../model/Message';
import moment from 'moment';
import {User} from '../../model/User';
import styles from './styles.module.scss';
import {v4 as uuidv4} from 'uuid';

export interface ChatComponentProps {
    chat: Chat,
    sender: User
}

export function ChatComponent({chat, sender}: ChatComponentProps) {
    const [editedMessage, setEditedMessage] = useState(undefined as unknown as Message);
    const [chatState, setChatState] = useState(chat);

    function last_message_timestamp(messages: Array<Message>) {
        return messages.length === 0 ? '' : moment(messages.sort((m1, m2) =>
            moment(m2.createdAt).diff(m1.createdAt))[0].createdAt).fromNow();
    }

    const sendMessage = useCallback(async (message: Message) => {
        //imitating latency
        let promise = new Promise((resolve) => {
            setTimeout(() => resolve(), 300)
        });
        await promise;
        message.createdAt = moment().toString();
        message.editedAt = '';
        message.id = uuidv4();
        setChatState((prevState: Chat) => {
            return {
                ...prevState,
                messages: [...prevState.messages, message]
            }
        })
    }, [setChatState]);


    return (
        <div className={styles.chat}>
            <img src="https://i.imgur.com/PLFeGFW.png" alt="Logo" className={styles.logo}/>
            <Header chat_name={chatState.name} members={chatState.users.length}
                    messages={chatState.messages.length}
                    last_message_timestamp={last_message_timestamp(chatState.messages)}/>
            <MessageFeed sender={sender} messages={chatState.messages} setEditedMessage={setEditedMessage}/>
            <MessageInput sender={sender} sendMessage={sendMessage}
                          messageId={editedMessage?.id} messageText={editedMessage?.text}/>
            <div></div>
        </div>
    )
}
