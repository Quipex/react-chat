import React, {useEffect, useState} from 'react';
import {Message} from '../../model/Message';
import {Header, Modal} from 'semantic-ui-react';
import {MessageInput} from '../message-input/MessageInput';
import {User} from '../../model/User';

export interface MessageConfiguratorProps {
    message: Message,
    sender: User,
    configureMessage: (message: Message) => void,
    setConfiguredMessage: (message: Message | undefined) => void
}

export function MessageConfigurator(
    {
        message,
        sender,
        configureMessage,
        setConfiguredMessage
    }: MessageConfiguratorProps) {

    const [modalOpen, setModalOpen] = useState(true);

    useEffect(() => {
        if (message === undefined) {
            setModalOpen(false);
        } else {
            setModalOpen(true);
        }
    }, [message]);

    function handleModalClose() {
        setConfiguredMessage(undefined);
    }

    function handleConfigureMessage(message: Message) {
        configureMessage(message);
        handleModalClose();
    }

    return (
        <Modal open={modalOpen} onClose={() => handleModalClose()}>
            <Header icon='cog' content='Configure message'/>
            <MessageInput sendMessage={handleConfigureMessage} sender={sender}
                          messageText={message.text} messageId={message.id}
                          setLastMessageEdited={() => {
                          }} cancelUpdatingMessage={() => {
            }}/>
        </Modal>
    )
}
