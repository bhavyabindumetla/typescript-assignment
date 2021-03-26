import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit'
import { normalize, schema } from 'normalizr';
import { UserConfig } from '../Api';

const fetchUsersApi = async () => {
    const endpoint: string = `https://reqres.in/api/users?page=1`;
    const data = await fetch(endpoint)
    return data.json()
}

const userEntity = new schema.Entity('users', {}, { idAttribute: "id" })

export const fetchUsers = createAsyncThunk("users/fetchAll", async () => {
    const response = await fetchUsersApi();
    const normalized = normalize(response.data, [userEntity])
    return normalized.entities
})
export interface UserState {
    entities: Array<UserConfig>;
    loading: boolean;
    error: string;
}


// Define initial state using that type
const initialStatetype: UserState = {
    entities: [],
    loading: false,
    error: "",
}
export const usersNormAdapter = createEntityAdapter<UserConfig>()
// export const usersNormAdapter = createEntityAdapter<UserConfig>({selectId:(user) => user.first_name})

const initialState = usersNormAdapter.getInitialState(initialStatetype)

export const slice = createSlice({
    name: "users",
    initialState,
    reducers: {
        removeUser: usersNormAdapter.removeOne,
        addUser: usersNormAdapter.addOne,
    },
    extraReducers: {
        [fetchUsers.pending.type]: (state) => {
            state.loading = true;
        },

        [fetchUsers.fulfilled.type]: (state, action) => {
            usersNormAdapter.upsertMany(state, action.payload.users);
            state.loading = false;
        },

        [fetchUsers.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error.message
        }
    }
})

export default slice.reducer

export const { removeUser, addUser } = slice.actions