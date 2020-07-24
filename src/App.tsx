import React, {useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './App.css';
import {ChatComponent} from './chat/components/chat/ChatComponent';
import './styles/reset.scss';
import 'semantic-ui-css/semantic.min.css';
import './styles/common.scss';
import userMock from './chat/repository/user-mock';
import Spinner from './chat/components/spinner/Spinner';
import {chatMock} from './chat/repository/chat-mock';
import {loadChatAction} from './store/chat/actions';
import {ChatActionTypes, ChatState} from './store/chat/types';
import {Chat} from './chat/model/Chat';

export interface AppProps {
    chat: Chat,
    loadChatAction: (chat: Chat) => ChatActionTypes
}

const App = (
    {
        chat,
        loadChatAction: loadChat
    }: AppProps) => {

    useEffect(() => {
        chatMock().then(value => loadChat(value))
            .catch(e => console.error('Error loading', e));
    }, []);

    console.log('chat', chat);
    return (
        chat.messages === undefined ? <Spinner/> : <ChatComponent chat={chat} sender={userMock('Quipex')}/>
    )
};

const actions = {
    loadChatAction
};

const mapStateToProps = (state: ChatState) => ({
    chat: {
        id: state.chatId,
        name: state.chatName,
        users: state.users,
        messages: state.messages
    }
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

