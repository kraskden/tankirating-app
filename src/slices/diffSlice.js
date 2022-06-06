import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { apiLoadDiffs } from "../service/diffs"
import {addThunkReducers, getIdleState} from '../util/slices'

const initialState = {
  base: {},
  full: {}
}

const targetFn = (state, action) => {
  const {format, period} = action.meta.arg 
  return [state[format.toLowerCase()], period]
}

const diffSlice = createSlice({
  name: 'diff',
  initialState,
  reducers: {
    eraseDiffs() {
      return {...initialState}
    }
  },
  extraReducers(builder) {
    addThunkReducers(builder, loadDiffs, targetFn)
  }
})

// Actions

export const loadDiffs = createAsyncThunk('diff/load', async ({format, period, params}, {getState}) => {
  const targetId = getState().target.data.id 
  return await apiLoadDiffs(targetId, period, format, params)
})

export const {eraseDiffs} = diffSlice.actions

// Selectors 
export const getDiffsSelector = (format, period) => state => {
  const slice = state.diffs[format]
  return slice[period] ?? getIdleState()
}

// Reducer
export const diffReducer = diffSlice.reducer