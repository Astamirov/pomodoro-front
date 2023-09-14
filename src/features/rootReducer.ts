import { combineReducers } from 'redux';
import ideasReducer from './ideasSlice';
import todosReducer from './todosSlice';
import signInSlice from './signInSlice';
import signUpSlice from './singUpSlice';
import usersSlice from './usersSlice';


const rootReducer = combineReducers({
    ideas: ideasReducer,
    todosReducer: todosReducer,
    signUpSlice: signUpSlice,
    signInSlice: signInSlice,
    usersSlice: usersSlice
    });

export default rootReducer;