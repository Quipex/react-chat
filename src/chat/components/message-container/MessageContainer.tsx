import React, {useState} from 'react';
import {Message} from '../../model/Message';
import styles from './styles.module.scss';
import moment from 'moment';
import {Button, Segment} from 'semantic-ui-react';

export interface MessageComponent {
    message: Message,
    className?: string,
    edit: (msg: Message) => void,
    userId: string
}

export function MessageContainer(
    {
        message,
        className,
        edit,
        userId
    }: MessageComponent
) {
    const edited = message.editedAt !== undefined && message.editedAt !== '';
    const timestamp_label = edited ? 'edited ' + moment(message.editedAt).fromNow() :
        moment(message.createdAt).fromNow();
    const timestamp = edited ? 'edited ' + moment(message.editedAt).format('LLL') :
        moment(message.createdAt).format('LLL');
    const [isLiked, setIsLiked] = useState(false);

    return (
        <Segment className={`${styles.message} ${className}`}>
            <div className={styles.avatar}>
                {
                    message.user.avatar !== '' && message.user.avatar !== undefined ?
                        (<img src={message.user.avatar} alt={message.user.name} className={styles.avatar}/>) :
                        (<div className={`${styles.no_avatar} ${styles.avatar}`}>
                            <span className={styles.initials}>{message.user.name?.charAt(0)}</span>
                        </div>)
                }
            </div>
            <span className={styles.username}>{message.user.name}</span>
            <span className={styles.timestamp} aria-label={timestamp} title={timestamp}>{timestamp_label}</span>
            <p className={styles.text}>{message.text}</p>
            <Button icon={isLiked ? 'heart' : 'heart outline'} color={ isLiked ? 'red' : 'grey'}
                    onClick={(ev, data) => setIsLiked(!isLiked)}/>

            {userId === message.user.id && (
                <div className={styles.modify_buttons}>
                    <Button icon='edit' color='grey'/>
                    <Button icon='trash alternate' color='grey'/>
                </div>
            )}
        </Segment>
    )
}
