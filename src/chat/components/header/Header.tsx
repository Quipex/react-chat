import React, {MutableRefObject} from 'react';
import {Menu, Sticky} from 'semantic-ui-react';
import styles from './styles.module.scss';


export interface HeaderComponentProps {
    chat_name: string,
    members: number,
    messages: number,
    last_message_timestamp: string,
    sticky_ref: MutableRefObject<null>
}

export function Header(
    {
        chat_name,
        members,
        messages,
        last_message_timestamp,
        sticky_ref
    }: HeaderComponentProps
) {
    return (
        <Sticky context={sticky_ref} className={styles.menu}>
            <Menu className="component-header">
                <Menu.Item>
                    {chat_name}
                </Menu.Item>
                <Menu.Item>{members} members</Menu.Item>
                <Menu.Item>{messages} messages</Menu.Item>
                <Menu.Item position={'right'}>Last message {last_message_timestamp}</Menu.Item>
            </Menu>
        </Sticky>
    )
}
