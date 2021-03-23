import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { USER_STATE } from '../Api';

// Define a  type for the splice state
interface UserState {
    users: USER_STATE[];
}

// Define initial state using that type
const initialState: UserState = {
    users: []
}

export const UserSlice = createSlice({
    name: "usersList",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        insertUser : (state, action: PayloadAction<USER_STATE[]>) => {
            state.users = [...state.users, ...action.payload]
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            let users = [...state.users]
            users.splice(action.payload,1)
            state.users = users
        }
    }
})

export const { insertUser, deleteUser } = UserSlice.actions

export default UserSlice.reducer