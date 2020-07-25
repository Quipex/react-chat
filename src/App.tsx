import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import './App.css';
import './styles/reset.scss';
import 'semantic-ui-css/semantic.min.css';
import './styles/common.scss';
import userMock from './chat/repository/user-mock';
import Spinner from './chat/components/spinner/Spinner';
import {chatMock} from './chat/repository/chat-mock';
import {loadChat} from './store/chat/actions';
import {Chat} from './chat/model/Chat';
import Store from './store/store';
import {setCurrentUser} from './store/profile/actions';
import ChatComponent from './chat/components/chat/ChatComponent';

export interface AppProps {
    chat: Chat,
    dispatch: Function
}

const App = (
    {
        chat,
        dispatch
    }: AppProps) => {

    useEffect(() => {
        chatMock().then(value => dispatch(loadChat(value)))
            .catch(e => console.error('Error loading', e));
        userMock('Quipex').then(value => dispatch(setCurrentUser(value)))
            .catch(e => console.error('Error loading', e))
        // This is done on purpose. The reason is to make sure the effect triggers only once when the component renders
        // for the first time.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        chat.id === '' ? <Spinner/> : <ChatComponent/>
    )
};


const mapStateToProps = (state: Store) => ({
    chat: {
        id: state.chat.chatId,
        name: state.chat.chatName,
        users: state.chat.users,
        messages: state.chat.messages
    }
});

export default connect(
    mapStateToProps
)(App);

