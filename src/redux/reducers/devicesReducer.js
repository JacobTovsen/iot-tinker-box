import { combineReducers } from 'redux';

const devicesReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORE_DEVICES':
            return action.payload;

        default:
            return state;
    }
};

export default combineReducers({
    devicesReducer
});