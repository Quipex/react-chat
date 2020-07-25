import {ProfileActionTypes, ProfileState, SET_USER} from './types';

export default (state: ProfileState = {user: {id: '', avatar: '', name: ''}}, action: ProfileActionTypes) => {
    switch (action.type) {
        case SET_USER:
            return {
                user: action.payload
            };
        default:
            return state;
    }
}
