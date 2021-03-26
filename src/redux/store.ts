import { configureStore } from '@reduxjs/toolkit'
import usersNormalizr from './users-normalizer-slice'
import users from './users-slice'

const store = configureStore({
    reducer: {
        usersRes: users,
        usersNormRes: usersNormalizr,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {usersRes: users}
export type AppDispatch = typeof store.dispatch

export default store