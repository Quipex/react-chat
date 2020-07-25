import React from 'react';
import {Message} from '../../model/Message';
import styles from './styles.module.scss';
import moment from 'moment';
import {Button, Segment} from 'semantic-ui-react';

export interface MessageComponent {
    message: Message,
    className?: string,
    setEditedMsg: (msg: Message) => void,
    deleteMsg: (messageId: string) => void,
    likeMsg: (messageId: string) => void,
    setConfiguredMsg: (msg: Message) => void,
    userId: string,
    isEdited: boolean,
    displayAvatar?: boolean
}

export function MessageContainer(
    {
        message,
        className,
        setEditedMsg,
        deleteMsg,
        likeMsg,
        setConfiguredMsg,
        userId,
        isEdited = false,
        displayAvatar = true
    }: MessageComponent
) {
    const edited = message.editedAt !== undefined && message.editedAt !== '';
    const timestamp_label = edited ? 'edited ' + moment(message.editedAt).fromNow() :
        moment(message.createdAt).fromNow();
    const timestamp = edited ? 'edited ' + moment(message.editedAt).format('LLL') :
        moment(message.createdAt).format('LLL');

    return (
        <Segment className={`${styles.message} ${className}`}>
            {displayAvatar && (
                <div className={styles.avatar}>
                    {
                        message.user.avatar !== '' && message.user.avatar !== undefined ?
                            (<img src={message.user.avatar} alt={message.user.name} className={styles.avatar}/>) :
                            (<div className={`${styles.no_avatar} ${styles.avatar}`}>
                                <span className={styles.initials}>{message.user.name?.charAt(0)}</span>
                            </div>)
                    }
                </div>
            )}
            <span className={styles.username}>{message.user.name}</span>
            <span className={styles.timestamp} aria-label={timestamp} title={timestamp}>{timestamp_label}</span>
            <p className={styles.text}>{message.text}</p>
            <Button className={styles.cogButton} icon='cog' onClick={() => setConfiguredMsg(message)} />
            <div className={styles.modify_buttons}>
                {userId !== message.user.id && (
                    <Button icon={message.isLiked ? 'heart' : 'heart outline'} color={message.isLiked ? 'red' : 'grey'}
                            onClick={() => likeMsg(message.id as string)} />
                )}
                {userId === message.user.id && (
                    <>
                        <Button icon='edit' color='grey'
                                onClick={() => setEditedMsg(message)}
                                disabled={isEdited}
                        />
                        <Button icon='trash alternate' color='grey'
                                onClick={() => deleteMsg(message.id as string)}
                                disabled={isEdited}
                        />
                    </>
                )}
            </div>
        </Segment>
    )
}
