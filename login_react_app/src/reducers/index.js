import { combineReducers } from 'redux';
import modals from './modals';
import users from './users'

const appReducer = combineReducers({
    modals,
    users
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;