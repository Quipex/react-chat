import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import {Form, Label, Message as MessageUI, Segment} from 'semantic-ui-react';
import {Message} from '../../model/Message';
import {User} from '../../model/User';


export interface MessageInputProps {
    sendMessage: (message: Message) => void,
    sender: User,
    messageId?: string,
    messageText?: string,
    className?: string
}

export function MessageInput(
    {
        sendMessage,
        sender,
        messageId = '',
        messageText = '',
        className= ''
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

    function handleKeyDown(ev: any) {
        const ENTER = 13, ESC = 27, ARR_UP = 38;
        switch (ev.keyCode) {
            case ENTER:
                if (!ev.shiftKey) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    handleSendMessage();
                }
                break;
            case ARR_UP:
                if (body === '') {
                    console.log('todo edit latest message');
                }
                break;
            case ESC:
                if (messageId !== undefined && messageId !== '') {
                    console.log('todo cancel updating message')
                }
        }
        console.log('key down', ev.keyCode, ev.shiftKey);
    }

    useEffect(() => {
        if (messageText !== '' && messageText !== undefined) {
            setBody(messageText);
        }
    }, [messageText]);

    return (
        <Segment className={className}>
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
                    onChange={(_ev, data) => setBody(data.value as string)}
                    onKeyDown={handleKeyDown}
                />
                <Form.Button color="blue" type="submit" loading={isPosting} disabled={body?.trim() === ''}>
                    {messageId !== undefined && messageId !== '' ? 'Update' : 'Send'}
                </Form.Button>
            </Form>
        </Segment>
    )
}
