import {configureStore} from "@reduxjs/toolkit"
import todosReducer from "../features/todosSlice"
import signInSlice from "../features/signInSlice"
import signUpSlice from "../features/singUpSlice"
import usersSlice from "../features/usersSlice"

const reducer = {
    todosReducer,
    signInSlice,
    signUpSlice,
    usersSlice

}
export const store = configureStore({
    reducer 

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch