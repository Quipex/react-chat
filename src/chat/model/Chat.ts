import {User} from './User';
import {Message} from './Message';

export interface Chat {
    id: string,
    name: string,
    users: Array<User>,
    messages: Array<Message>
}
