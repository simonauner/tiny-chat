export const SET_USER_SUCCESS = 'SET_USER_SUCCESS';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';

export function setUserAction(data) {
    return {
        type: SET_USER_SUCCESS,
        payload: data,
    };
}

export function deleteUserAction() {
    return {
        type: DELETE_USER_SUCCESS,
    };
}
