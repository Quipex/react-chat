import {User} from '../../chat/model/User';
import {ProfileActionTypes, SET_USER} from './types';

export function setCurrentUser(user: User | undefined): ProfileActionTypes {
    return {
        type: SET_USER,
        payload: user
    }
}
