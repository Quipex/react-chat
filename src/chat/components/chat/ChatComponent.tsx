import React, {useCallback, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {Header} from '../header/Header';
import {MessageFeed} from '../messageFeed/MessageFeed';
import {MessageInput} from '../message-input/MessageInput';
import {Message} from '../../model/Message';
import moment from 'moment';
import {User} from '../../model/User';
import styles from './styles.module.scss';
import {v4 as uuidv4} from 'uuid';
import Ref from 'semantic-ui-react/dist/commonjs/addons/Ref';
import {
    configureMessage,
    deleteMessage,
    editMessage,
    likeMessage,
    sendMessage,
    setConfiguredMessage,
    setEditedMessage
} from '../../../store/chat/actions';
import {bindActionCreators} from 'redux';
import Store from '../../../store/store';
import Spinner from '../spinner/Spinner';
import {MessageConfigurator} from '../message-configurator/MessageConfigurator';

export interface ChatComponentProps {
    chatId?: string,
    chatName?: string,
    messages?: Array<Message>,
    users?: Array<User>,
    editedMessage?: Message,
    configuredMessage?: Message,
    sender?: User,
    sendMessage: (msg: Message) => void,
    editMessage: (msg: Message) => void,
    deleteMessage: (id: string) => void,
    setEditedMessage: (msg: Message | undefined) => void,
    setConfiguredMessage: (msg: Message | undefined) => void,
    configureMessage: (msg: Message) => void,
    likeMessage: (id: string) => void
}

function ChatComponent(
    {
        chatName,
        messages,
        users,
        editedMessage,
        configuredMessage,
        sender,
        sendMessage: sendMsg,
        editMessage: editMsg,
        deleteMessage: deleteMsg,
        setEditedMessage: setEditedMsg,
        setConfiguredMessage: setConfiguredMsg,
        configureMessage: configureMsg,
        likeMessage: likeMsg
    }: ChatComponentProps) {
    const bottomRef = useRef(null);
    const stickyHeaderRef = useRef(null);

    function sortMessagesFromLatest(messages: Array<Message>) {
        return messages.sort((m1, m2) =>
            moment(m2.createdAt).diff(m1.createdAt));
    }

    function last_message_timestamp(messages: Array<Message>) {
        return messages.length === 0 ? '' : moment((sortMessagesFromLatest(messages))[0].createdAt).fromNow();
    }

    const handleSendMessage = useCallback(async (message: Message) => {
        //imitating latency
        let promise = new Promise((resolve) => {
            setTimeout(() => resolve(), 300)
        });
        await promise;
        if (message.id !== '' && message.id !== undefined) {
            // had an id => editing
            editMsg(message);
            // @ts-ignore
            setEditedMsg(undefined);
        } else {
            // didn't have an id => saving new
            message.createdAt = moment().toISOString();
            message.editedAt = '';
            message.id = uuidv4();
            sendMsg(message);
        }
    }, [editMsg, sendMsg, setEditedMsg]);

    function setLastMessageEdited() {
        if (messages && sender && messages.length > 0) {
            const filtered = messages.filter(m => m.user.id === sender.id);
            if (filtered.length > 0) {
                const messages1 = sortMessagesFromLatest(filtered);
                setEditedMsg(messages1[0])
            }
        }
    }

    function cancelMessageEditing() {
        setEditedMsg(undefined);
    }

    const messagesLength = messages?.length;
    useEffect(() => {
        // @ts-ignore
        bottomRef.current.scrollIntoView({behavior: 'auto'});
    }, [messagesLength]);

    return (
        <div className={styles.chat}>
            <div className={styles.chat_area}>
                <img src="https://i.imgur.com/PLFeGFW.png" alt="Logo" className={styles.logo}/>
                <Ref innerRef={stickyHeaderRef}>
                    {/* <Ref> needs to have only one child node, that's why <div> is wrapping*/}
                    <div>
                        <Header chat_name={chatName as string} members={users ? users.length : 0}
                                messages={messages ? messages.length : 0}
                                last_message_timestamp={last_message_timestamp(messages ? messages : [])}
                                sticky_ref={stickyHeaderRef}
                        />
                        {sender && messages ? (
                            <MessageFeed sender={sender} messages={messages} deleteMessage={deleteMsg}
                                         setEditedMessage={setEditedMsg} editedMessage={editedMessage}
                                         setConfiguredMessage={setConfiguredMsg} likeMessage={likeMsg}
                            />
                        ) : <Spinner/>}

                    </div>
                </Ref>
                <div ref={bottomRef as any}/>
            </div>
            {sender && (
                <MessageInput className={styles.input_area} sender={sender} sendMessage={handleSendMessage}
                              messageId={editedMessage?.id} messageText={editedMessage?.text}
                              cancelUpdatingMessage={() => cancelMessageEditing()}
                              setLastMessageEdited={() => setLastMessageEdited()}/>
            )}
            {configuredMessage &&
            <MessageConfigurator configureMessage={configureMsg} setConfiguredMessage={setConfiguredMsg}
                                 sender={configuredMessage.user} message={configuredMessage}/>}
        </div>
    )
}

// noinspection JSUnusedGlobalSymbols
const actions = {
    sendMessage,
    editMessage,
    deleteMessage,
    setEditedMessage,
    setConfiguredMessage,
    likeMessage,
    configureMessage
};

const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch);

const mapStateToProps = (state: Store) => ({
    sender: state.profile.user,
    chatName: state.chat.chatName,
    messages: state.chat.messages,
    users: state.chat.users,
    configuredMessage: state.chat.configuredMessage,
    editedMessage: state.chat.editedMessage
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChatComponent);
