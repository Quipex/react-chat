import React from 'react';
import './App.css';
import {ChatComponent} from './chat/components/chat/ChatComponent';
import './styles/reset.scss';
import 'semantic-ui-css/semantic.min.css';
import './styles/common.scss';
import userMock from './chat/repository/user-mock';
import Spinner from './chat/components/spinner/Spinner';
import {chatMock} from './chat/repository/chat-mock';

class App extends React.Component {

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            loading: false,
            chat: undefined
        }
    }

    async componentDidMount() {
        try {
            const chat = await chatMock();
            this.setState({
                loading: false,
                chat
            })
        } catch(e) {
            console.error('Error loading', e)
        }
    }

    render() {
        return (
            // @ts-ignore
            this.state.chat === undefined ? <Spinner/> : <ChatComponent chat={this.state.chat} sender={userMock('Quipex')}/>
        );
    }
}

export default App;
