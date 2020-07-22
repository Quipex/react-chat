import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Header} from '../header/Header';
import {MessageFeed} from '../messageFeed/MessageFeed';
import {MessageInput} from '../message-input/MessageInput';
import {Chat} from '../../model/Chat';
import {Message} from '../../model/Message';
import moment from 'moment';
import {User} from '../../model/User';
import styles from './styles.module.scss';
import {v4 as uuidv4} from 'uuid';
import Ref from 'semantic-ui-react/dist/commonjs/addons/Ref';

export interface ChatComponentProps {
    chat: Chat,
    sender: User
}

export function ChatComponent({chat, sender}: ChatComponentProps) {
    const [editedMessage, setEditedMessage] = useState(undefined as unknown as Message);
    const [chatState, setChatState] = useState(chat);
    const bottomRef = useRef(null);
    const contextRef = useRef(null);

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
        if (message.id !== '' && message.id !== undefined) {
            // had an id => editing
            setChatState((prevState: Chat) => {
                return {
                    ...prevState,
                    messages: prevState.messages.map(m => {
                        if (m.id === message.id) {
                            m.editedAt = moment().toISOString();
                            m.text = message.text;
                        }
                        return m;
                    })
                }
            });
            // @ts-ignore
            setEditedMessage(undefined);
        } else {
            // didn't have an id => saving new
            message.createdAt = moment().toISOString();
            message.editedAt = '';
            message.id = uuidv4();
            setChatState((prevState: Chat) => {
                return {
                    ...prevState,
                    messages: [...prevState.messages, message]
                }
            })
        }
    }, [setChatState]);

    useEffect(() => {
        // @ts-ignore
        bottomRef.current.scrollIntoView({behavior: "smooth"});
    });

    const deleteMessage = (deletedMessage: Message) => {
        setChatState((prevState: Chat) => {
            return {
                ...prevState,
                messages: prevState.messages.filter(m => m.id !== deletedMessage.id)
            }
        })
    };

    return (
        <div className={styles.chat}>
            <img src="https://i.imgur.com/PLFeGFW.png" alt="Logo" className={styles.logo}/>
            <Ref innerRef={contextRef}>
                <div>
                    <Header chat_name={chatState.name} members={chatState.users.length}
                            messages={chatState.messages.length}
                            last_message_timestamp={last_message_timestamp(chatState.messages)}
                            sticky_ref={contextRef}
                    />
                    <MessageFeed sender={sender} messages={chatState.messages}
                                 setEditedMessage={setEditedMessage} deleteMessage={deleteMessage}
                                 editedMessage={editedMessage}
                    />
                </div>
            </Ref>
            <MessageInput sender={sender} sendMessage={sendMessage}
                          messageId={editedMessage?.id} messageText={editedMessage?.text}/>
            <div ref={bottomRef}/>
        </div>
    )
}
