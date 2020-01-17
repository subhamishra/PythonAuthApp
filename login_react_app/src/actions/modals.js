import ModalsActionTypes from './actionTypes/modals';

export const showModal = (params) => (dispatch) => {    
    dispatch({
        type: ModalsActionTypes.SHOW_MODAL,
        resource: params.resource,
        params: params
    });
}

export const hideModal = () => (dispatch) => {    
    dispatch({
        type: ModalsActionTypes.HIDE_MODAL
    });
}

export const showNestedModal = (params) => (dispatch) => {    
    dispatch({
        type: ModalsActionTypes.SHOW_NESTED_MODAL,
        resource: params.resource,
        params: {...params, isNestedModal: true}
    });
}

export const hideNestedModal = () => (dispatch) => {    
    dispatch({
        type: ModalsActionTypes.HIDE_NESTED_MODAL
    });
}