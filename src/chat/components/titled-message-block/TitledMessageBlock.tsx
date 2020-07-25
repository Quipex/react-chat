import {Message} from '../../model/Message';
import {Label, Sticky} from 'semantic-ui-react';
import React, {createRef} from 'react';
import {MessageContainer} from '../message-container/MessageContainer';
import {User} from '../../model/User';
import styles from './styles.module.scss';
import Ref from 'semantic-ui-react/dist/commonjs/addons/Ref';

export interface TitledMessageBlockProps {
    title: string,
    messages: Array<Message>,
    sender: User,
    setEditedMessage: (msg: Message) => void,
    deleteMessage: (id: string) => void,
    editedMessage?: Message,
    setConfiguredMessage: (msg: Message) => void,
    likeMessage: (id: string) => void
}

export class TitledMessageBlock extends React.Component<TitledMessageBlockProps> {
    sticky_ref = createRef();

    render() {
        return (
            <Ref innerRef={this.sticky_ref}>
                <div className={styles.sticky_container}>
                    <Sticky context={this.sticky_ref} offset={60}>
                        <div className={styles.date_label}>
                            <Label>{this.props.title}</Label>
                        </div>
                    </Sticky>
                    <div className={styles.messageFeed}>
                        {this.props.messages.map(message => (
                            <MessageContainer message={message} key={message.id}
                                              className={`${this.props.sender.id === message.user.id ? styles.your_message : styles.their_message}
                                      ${message === this.props.editedMessage ? styles.edited_message : ''}`}
                                              setEditedMsg={this.props.setEditedMessage}
                                              userId={this.props.sender.id}
                                              deleteMsg={this.props.deleteMessage}
                                              isEdited={message === this.props.editedMessage}
                                              setConfiguredMsg={this.props.setConfiguredMessage}
                                              likeMsg={this.props.likeMessage}
                                              displayAvatar={this.props.sender.id !== message.user.id}
                            />
                        ))}
                    </div>
                </div>
            </Ref>
        )
    }
}
