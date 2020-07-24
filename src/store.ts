import { combineReducers, createStore } from 'redux';
import chatReducer from './store/chat/reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducers = {
    chat: chatReducer
};

const rootReducer = combineReducers({...reducers});

const composedEnhancers = composeWithDevTools();

const store = createStore(
    rootReducer,
    composedEnhancers
);

export default store;
