import React from 'react';
import './styles.module.scss'
import {Message} from '../../model/Message';
import styles from './styles.module.scss'
import moment from 'moment';
import {User} from '../../model/User';
import {TitledMessageBlock} from '../titled-message-block/TitledMessageBlock';

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
    const dateToMessages = new Map<string, Array<Message>>();
    messages.sort((m1, m2) => moment(m1.createdAt).diff(m2.createdAt))
        .forEach(msg => {
            const day = moment(msg.createdAt).startOf('day').format('DD.MM.yyyy');
            let array = dateToMessages.get(day);
            if (array === undefined) {
                array = []
            }
            array.push(msg);
            dateToMessages.set(day, array);
        });
    const dates = [];
    // @ts-ignore
    for (const item of dateToMessages.keys()) {
        dates.push(item);
    }
    return (
        <div className={styles.messageFeed}>
            {dates.map(date => (
                <TitledMessageBlock title={date}
                                    messages={dateToMessages.get(date) as Message[]}
                                    sender={sender}
                                    setEditedMessage={setEditedMessage}
                                    deleteMessage={deleteMessage}
                                    setConfiguredMessage={setConfiguredMessage}
                                    likeMessage={likeMessage}
                                    editedMessage={editedMessage} key={date}
                />
            ))}
        </div>
    )
}
