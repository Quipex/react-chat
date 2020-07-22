import {User} from '../model/User';
import {v4 as uuidv4} from 'uuid';

export default function userMock(name: string = 'Test user'): User {
    return {id: uuidv4(), name}
}
