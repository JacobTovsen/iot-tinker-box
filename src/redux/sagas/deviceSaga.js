import axios from 'axios';
import {call, put, takeEvery} from 'redux-saga/effects';

function* fetchAllDevices(){
    try {
        const items = yield call(axios.get, '/api/device');
        yield put({type: 'STORE_DEVICES', payload: items.data})
    } catch (error) {
        console.log('Error in fetchAll deviceSaga GET');
    }
}

function* addNewDevice(action){
    try{
        yield call(axios.post, '/api/device', action.payload)
        yield put({type: 'GET_DEVICES'});
    } catch (error) {
        console.log('Error in saga addNewDevice saga:', error);
    }
}

function* deviceSaga(){
    yield takeEvery( 'GET_DEVICES', fetchAllDevices);
    yield takeEvery( 'ADD_DEVICE', addNewDevice);
}

export default deviceSaga;