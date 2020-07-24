import {User} from './User';

export interface Message {
    id?: string,
    text: string,
    user: User,
    isLiked?: boolean,
    editedAt?: string,
    createdAt?: string
}
