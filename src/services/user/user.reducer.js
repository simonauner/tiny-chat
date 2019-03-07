import { SET_USER_SUCCESS, DELETE_USER_SUCCESS } from './user.actions';

const initialState = {
    name: null,
    returning: false,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_SUCCESS:
            return action.payload;
        case DELETE_USER_SUCCESS:
            return initialState;
        default:
            return state;
    }
};
