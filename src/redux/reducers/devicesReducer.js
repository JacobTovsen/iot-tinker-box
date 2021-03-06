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

const tempReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORE_TEMP':
            return action.payload

        case 'TEMP_UP':
            return {...state ++};

        case 'TEMP_DOWN':
            return {...state --};
        
        default:
            return state;
    }
};

const newestTempReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORE_NEWEST_TEMP':
            return action.payload
        
            default:
            return state;
    }
};

const apiDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'STORE_API_DATA':
            return action.payload
        
            default:
            return state;
    }
};

export default combineReducers({
    devicesReducer,
    dataReducer,
    tempReducer,
    newestTempReducer,
    apiDataReducer
});