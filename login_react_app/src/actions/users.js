import UsersActionTypes from './actionTypes/users';

export const saveUserData = (user) => (dispatch) => {    
    dispatch({
        type: UsersActionTypes.SAVE_USER_DATA,
        user
    });
}