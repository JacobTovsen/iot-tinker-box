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

function* deviceSaga(){
    yield takeEvery( 'GET_DEVICES', fetchAllDevices);
}

export default deviceSaga;