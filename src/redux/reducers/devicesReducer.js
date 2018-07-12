import { combineReducers } from 'redux';

const devicesReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORE_DEVICES':
            return action.payload;

        default:
            return state;
    }
};

const dataReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORE_DATA':
            return action.payload;

        default:
            return state;
    }
};

const tempReducer = (state = [70], action) => {
    switch (action.type) {
        case 'STORE_TEMP':
            return action.payload;

        case 'TEMP_UP':
            return {...state ++};

        case 'TEMP_UP':
            return {...state --};
        
        default:
            return state;
    }
};

export default combineReducers({
    devicesReducer,
    dataReducer,
    tempReducer
});