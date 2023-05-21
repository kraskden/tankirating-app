import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addThunkReducers, getIdleState } from "../util/slices";
import {apiGetTargetByName, apiActivateTarget, apiUpdateTarget} from '../service/target'
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
        addThunkReducers(builder, activateTarget)
        addThunkReducers(builder, updateTarget)
    }
})


export const loadTarget = createAsyncThunk('target/set', async ({name, type}, {dispatch, getState}) => {
    const target = await apiGetTargetByName(name, type)
    eraseUserData(dispatch)
    return target   
});


export const activateTarget = createAsyncThunk('target/activate', async ({id, captcha}, {dispatch}) => {
    const target = await apiActivateTarget(id, captcha)
    eraseUserData(dispatch)
    return target
})

export const updateTarget = createAsyncThunk('target/update', async ({id, captcha}, {dispatch}) => {
    const target = await apiUpdateTarget(id, captcha)
    eraseUserData(dispatch)
    return target
})

export const getTarget = state => state.target

export const targetReducer = targetSlice.reducer

function eraseUserData(dispatch) {
    dispatch(eraseSnapshot())
    dispatch(eraseHeatMap())
    dispatch(eraseDiffs())
    dispatch(eraseSummary())
}