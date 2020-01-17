import ModalActionTypes from "../actions/actionTypes/modals";
import ModalsRecord from "./records/modals";

const initialState = new ModalsRecord();

const modals = (state = initialState, action) => {
  switch (action.type) {
    case ModalActionTypes.SHOW_MODAL:
      return state.merge({
        resource: action.resource,
        params: action.params
      });
    case ModalActionTypes.HIDE_MODAL:
    return state.merge({
        resource: '',
        params: {}
      });
    case ModalActionTypes.SHOW_NESTED_MODAL:
      return state.merge({
        nestedResource: action.resource,
        nestedParams: action.params
      });
    case ModalActionTypes.HIDE_NESTED_MODAL:
        return state.merge({
            nestedResource: '',
            nestedParams: {}
        });
    default:
      return state;
  }
}

export default modals;