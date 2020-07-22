import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import {Form, Label, Segment, Message as MessageUI} from 'semantic-ui-react';
import {Message} from '../../model/Message';
import {User} from '../../model/User';


export interface MessageInputProps {
    sendMessage: (message: Message) => void,
    sender: User,
    messageId?: string,
    messageText?: string
}

export function MessageInput(
    {
        sendMessage,
        sender,
        //todo: finish editing message
        messageId = '',
        messageText = ''
    }: MessageInputProps) {
    const [body, setBody] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSendMessage() {
        if (body?.trim() === '') {
            return;
        }
        setIsPosting(true);
        setErrorMessage('');
        try {
            await sendMessage({user: sender, text: body, id: messageId});
            setBody('');
        } catch (e) {
            setErrorMessage(e.message);
        } finally {
            setIsPosting(false);
        }
    }

    useEffect(() => {
        if (messageText !== '' && messageText !== undefined) {
            setBody(messageText);
        }
    }, [messageText]);

    return (
        <Segment className={`${styles.full_width} ${styles.input_form}`}>
            {errorMessage !== '' && <Label className={styles.errorMessage}>{errorMessage}</Label>}
            <Form onSubmit={handleSendMessage}>
                {messageText !== '' && messageText !== undefined && (
                    <MessageUI color='blue'>
                        Edited Text: {messageText}
                    </MessageUI>
                )}
                <Form.TextArea
                    className={styles.textarea}
                    name="body"
                    value={body}
                    placeholder="Write a message..."
                    onChange={(ev, data) => setBody(data.value as string)}
                />
                <Form.Button color="blue" type="submit" loading={isPosting}>
                    {messageId !== undefined && messageId !== '' ? 'Update' : 'Send'}
                </Form.Button>
            </Form>
        </Segment>
    )
}
