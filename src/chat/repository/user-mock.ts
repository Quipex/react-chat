import {User} from '../model/User';
import {v4 as uuidv4} from 'uuid';

export default async function userMock(name: string = 'Test user'): Promise<User> {
    return new Promise(resolve => resolve({id: uuidv4(), name}));
}
