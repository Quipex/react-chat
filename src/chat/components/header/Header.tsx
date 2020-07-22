import React from 'react';
import {Menu} from 'semantic-ui-react';


export interface HeaderComponentProps {
    chat_name: string,
    members: number,
    messages: number,
    last_message_timestamp: string
}

export function Header(
    {
        chat_name,
        members,
        messages,
        last_message_timestamp
    }: HeaderComponentProps
) {
    return (
        <Menu className="component-header">
            <Menu.Item>
                {chat_name}
            </Menu.Item>
            <Menu.Item>{members} members</Menu.Item>
            <Menu.Item>{messages} messages</Menu.Item>
            <Menu.Item position={'right'}>Last message {last_message_timestamp}</Menu.Item>
        </Menu>
    )
}
