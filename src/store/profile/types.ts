import {User} from '../../chat/model/User';

export const SET_USER = 'PROFILE:SET_USER';

export interface ProfileState {
    user: User
}

interface SetUserAction {
    type: typeof SET_USER,
    payload: User | undefined
}


export type ProfileActionTypes = SetUserAction;
