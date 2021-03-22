import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import loading from './loading';
import petugas from '../containers/Petugas/reducer';
import pengaduan from '../containers/Pengaduan/reducer';

const rootReducer = combineReducers({
  form: formReducer,
  routing: routerReducer,
  loading,
  petugas,
  pengaduan,
});

export default rootReducer;
