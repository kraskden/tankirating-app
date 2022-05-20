import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLatestSnapshot } from "../service/snapshot";
import { addThunkReducers, singleLoadState } from "../util/slices";

const initialState = singleLoadState

const snapshotSlice = createSlice({
    name: 'currSnapshot',
    initialState,
    reducers: {
        eraseSnapshot(state, action) {
            return {...initialState}
        }
    },
    extraReducers(builder) {
        addThunkReducers(builder, loadLastSnapshot)
    }
})

export const loadLastSnapshot = createAsyncThunk('snapshot/load', async (_, {getState}) => {
    const user = getState().target.data
    const {data} = await getLatestSnapshot(user.id)
    return data
})

export const {eraseSnapshot} = snapshotSlice.actions

export const getSnapshot = state => state.snapshot
export const snapshotReducer = snapshotSlice.reducer
