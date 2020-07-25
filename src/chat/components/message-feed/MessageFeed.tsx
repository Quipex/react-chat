import React from 'react';
import './styles.module.scss'
import {Message} from '../../model/Message';
import styles from './styles.module.scss'
import moment from 'moment';
import {MessageContainer} from '../message-container/MessageContainer';
import {User} from '../../model/User';

export interface MessageFeedComponent {
    messages: Array<Message>,
    sender: User,
    setEditedMessage: (msg: Message) => void,
    deleteMessage: (id: string) => void,
    editedMessage?: Message,
    setConfiguredMessage: (msg: Message) => void,
    likeMessage: (id: string) => void
}

export function MessageFeed(
    {
        messages,
        sender,
        setEditedMessage,
        deleteMessage,
        editedMessage,
        setConfiguredMessage,
        likeMessage
    }: MessageFeedComponent
) {
    return (
        <div className={styles.messageFeed}>
            {messages.sort((m1, m2) => moment(m1.createdAt).diff(m2.createdAt))
                .map(message => (
                    <MessageContainer message={message} key={message.id}
                                      className={`${sender.id === message.user.id ? styles.your_message : styles.their_message}
                                      ${message === editedMessage ? styles.edited_message : ''}`}
                                      setEditedMsg={setEditedMessage} userId={sender.id}
                                      deleteMsg={deleteMessage} isEdited={message === editedMessage}
                                      setConfiguredMsg={setConfiguredMessage} likeMsg={likeMessage}
                                      displayAvatar={sender.id !== message.user.id}
                    />
                ))}
        </div>
    )
}
