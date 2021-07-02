import {combineReducers} from 'redux';
import {namesReducer} from './nameReducers';

const reducers = combineReducers({
    allNames:namesReducer
});

export default reducers;