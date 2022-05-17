import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addThunkReducers, getSelectors, singleLoadState } from "../util/slices";
import {getTargetByName} from '../service/target'
import { eraseSnapshot } from "./snapshotSlice";

const initialState = singleLoadState

const targetSlice = createSlice({
    name: 'target',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        addThunkReducers(builder, loadTarget)
    }
})

export const loadTarget = createAsyncThunk('target/set', async (name, {dispatch, getState}) => {
    await (new Promise((res, rej) => setTimeout(() => res(), 2000)))
    const {data} = await getTargetByName(name)
    dispatch(eraseSnapshot())
    return data    
});

export const getTarget = state => state.target

export const targetReducer = targetSlice.reducer