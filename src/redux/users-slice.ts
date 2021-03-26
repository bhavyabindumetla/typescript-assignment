import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { normalize, schema } from 'normalizr'
import { UserConfig } from '../Api';


const sampleData ={
    users:[
    {
        _id: "123",
        name: "bhavya",
    },
    {
        _id: "345",
        name: "sdfghj",
    }
]}

const userEntity = new schema.Entity('users', {}, { idAttribute: "id" })
const sampleEntity = new schema.Entity('users', {}, { idAttribute: "_id" })

// create async thunk example
export const fetchUsersThunk = createAsyncThunk(
    "users/fetchUsers",
    async(thunkAPI) => {
        // with normalizr
        const endpoint: string = `https://reqres.in/api/users?page=1`;
        const response = await(await fetch(endpoint)).json();
        const normalized = normalize(response.data, [userEntity])
        const samplenorm = normalize(sampleData.users, [sampleEntity])
        console.log("normali", samplenorm, sampleData, response.data)
        return normalized.entities

        // without normalizr
        // const endpoint: string = `https://reqres.in/api/users?page=1`;
        // const data = await(await fetch(endpoint)).json();
        // return data.data
    }
)

// Define a  type for the splice state
export interface UserState {
    users: Array<UserConfig>;
    loading: boolean;
    error: string;
    ids: Array<string>;
}

// Define initial state using that type
const initialState: UserState = {
    users: [],
    loading: false,
    error: "",
    ids: [],
}

export const UserSlice = createSlice({
    name: "usersList",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        insertUser : (state, action: PayloadAction<Array<UserConfig>>) => {
            state.users = [...state.users, ...action.payload]
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.users.splice(action.payload,1)
        }
    },
    extraReducers: {
        [fetchUsersThunk.fulfilled.type]: (state, action) => {
            state.users = action.payload.users;
            state.ids = Object.keys(action.payload.users)
            state.loading = false;
        },
        [fetchUsersThunk.pending.type]: (state,action) => {
            state.loading = true;
        },
        [fetchUsersThunk.rejected.type]: (state,action) => {
            state.loading = false;
            state.error= action.error.message
        }
    }
})

export const { insertUser, deleteUser } = UserSlice.actions

export default UserSlice.reducer