import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getLatestSnapshot } from "../service/snapshot";
import { addThunkReducers, getIdleState } from "../util/slices";

const initialState = getIdleState()

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
    return  await getLatestSnapshot(user.id)
})

export const {eraseSnapshot} = snapshotSlice.actions

export const getSnapshot = state => state.snapshot
export const snapshotReducer = snapshotSlice.reducer
