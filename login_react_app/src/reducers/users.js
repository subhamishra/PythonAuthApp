import UsersActionTypes from "../actions/actionTypes/users";
import UsersRecord from "./records/users";

const initialState = new UsersRecord();

const users = (state = initialState, action) => {
  switch (action.type) {
    case UsersActionTypes.SAVE_USER_DATA:
      return state.set('user', action.user);
    default:
      return state;
  }
}

export default users;