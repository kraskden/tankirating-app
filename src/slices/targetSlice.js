import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addThunkReducers, getIdleState } from "../util/slices";
import {getTargetByName} from '../service/target'
import { eraseSnapshot } from "./snapshotSlice";
import { eraseHeatMap } from "./heatMapSlice";
import { eraseDiffs } from "./diffSlice";
import { eraseSummary } from "./summarySlice";

const initialState = getIdleState()

const targetSlice = createSlice({
    name: 'target',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        addThunkReducers(builder, loadTarget)
    }
})

export const loadTarget = createAsyncThunk('target/set', async ({name, type}, {dispatch, getState}) => {
    const target = await getTargetByName(name, type)
    // TODO: global eraseUserData() action and global reducer...
    dispatch(eraseSnapshot())
    dispatch(eraseHeatMap())
    dispatch(eraseDiffs())
    dispatch(eraseSummary())
    return target   
});

export const getTarget = state => state.target

export const targetReducer = targetSlice.reducer