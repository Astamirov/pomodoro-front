import { combineReducers } from 'redux';
import ideasReducer from './ideasSlice';
import todosReducer from './todosSlice';



const rootReducer = combineReducers({
    ideas: ideasReducer,
    todos: todosReducer,
    });

export default rootReducer;