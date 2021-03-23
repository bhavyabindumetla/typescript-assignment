import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import users from './users-slice'

// const rootReducer = combineReducers({
//     users
// })

const store = configureStore({
    reducer: {
        usersRes: users
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store