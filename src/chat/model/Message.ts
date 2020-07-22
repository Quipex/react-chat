import {User} from './User';

export interface Message {
    id?: string,
    text: string,
    user: User,
    editedAt?: string,
    createdAt?: string
}
