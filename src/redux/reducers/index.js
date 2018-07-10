import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import devices from './devicesReducer';

const store = combineReducers({
  user,
  login,
  devices,
});

export default store;
