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
        console.log('Error in saga addNewDevice:', error);
    }
}

function* getData(){
    try{
        const data = yield call(axios.get, '/api/device/data');
        yield put({type: 'STORE_DATA', payload: data.data})
    } catch (error) {
        console.log('Error in saga getData:', error);
    }
}

function* deleteData(action){
    try{
        console.log('this is action.payload:', action.payload);
        yield call(axios.delete, `/api/device/${action.payload}`);
        yield put({type:'GET_DATA'});
    } catch (error ) {
        console.log('Error in saga deleteData:', error);
    }
}

function* deleteDevice(action){
    try{
        console.log('this is action.payload:', action.payload);
        yield call(axios.delete, `/api/device/delete/${action.payload}`);
        yield put({type:'GET_DEVICES'});
    } catch (error ) {
        console.log('Error in saga deleteDevice:', error);
    }
}
function* getTemp(){
    try{
        const temp = yield call(axios.get, '/api/device/temp');
        yield put({type: 'STORE_TEMP', payload: temp.data})
    } catch (error) {
        console.log('Error in saga getTemp:', error);
    }
}

function* newTemp(action){
    try{
        yield call(axios.post, '/api/device/temp', action.payload)
        yield put({type: 'GET_TEMP'});
    } catch (error) {
        console.log('Error in saga addNewDevice:', error);
    }
}

function* getNewestTemp(){
    try{
        const newestTemp = yield call(axios.get, '/api/device/temp/newest');
        yield put({type: 'STORE_NEWEST_TEMP', payload: newestTemp.data})
    } catch (error) {
        console.log('Error in saga getTemp:', error);
    }
}

function* editData(action){
    try{
        console.log(action.payload);
        yield call(axios.put, `/api/device/data/edit/${action.payload.id}`, action.payload);
        yield put({type:'GET_DATA'});
    } catch (error) {
        console.log('Error in saga editData', error);
    }
}

function* getApiData(){
    try{
        const data = yield call(axios.get, '/api/device/weather');
        yield put({type: 'STORE_API_DATA', payload: data.data})
    } catch (error) {
        console.log('Error in saga getData:', error);
    }
}

function* deviceSaga(){
    yield takeEvery( 'GET_DEVICES', fetchAllDevices);
    yield takeEvery( 'ADD_DEVICE', addNewDevice);
    yield takeEvery( 'GET_DATA', getData );
    yield takeEvery( 'DELETE_DATA', deleteData );
    yield takeEvery( 'GET_TEMP', getTemp);
    yield takeEvery( 'NEW_TEMP', newTemp);
    yield takeEvery( 'GET_NEWEST_TEMP', getNewestTemp);
    yield takeEvery( 'EDIT_DATA', editData);
    yield takeEvery( 'GET_API_DATA', getApiData);
    yield takeEvery( 'DELETE_DEVICE', deleteDevice);

}

export default deviceSaga;