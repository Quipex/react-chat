import { combineReducers, createStore } from 'redux';
import chatReducer from './store/chat/reducers';
import profileReducer from './store/profile/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = {
    chat: chatReducer,
    profile: profileReducer
};

const rootReducer = combineReducers({...reducers});

const composedEnhancers = composeWithDevTools();

const store = createStore(
    rootReducer,
    composedEnhancers
);

export default store;
