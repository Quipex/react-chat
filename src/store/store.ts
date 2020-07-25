import {ChatState} from './chat/types';
import {ProfileState} from './profile/types';

export default interface Store {
    chat: ChatState,
    profile: ProfileState
}
