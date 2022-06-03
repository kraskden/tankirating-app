import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addThunkReducers, getIdleState } from "../util/slices";
import {apiGetHeatMap} from '../service/heatMap'

const initialState = {}

const targetFn = (state, action) => [state, action.meta.arg]

const heatMapSlice = createSlice({
  name: 'heatMap',
  initialState,
  reducers: {
    eraseHeatMap(state, action) {
      return initialState
    }
  },
  extraReducers(builder) {
    addThunkReducers(builder, loadHeatMap, targetFn)
  }
})

export const loadHeatMap = createAsyncThunk('heatMap/load', async (year, {getState}) => {
  const targetId = getState().target.data.id 
  return await apiGetHeatMap(targetId, year)
})

export const getHeatMapSelector = year => state => {
  const slice = state.heatMap;
  if (slice[year]) {
    return slice[year]
  } else {
    return getIdleState()
  }
}

export const {eraseHeatMap} = heatMapSlice.actions
export const heatMapReducer = heatMapSlice.reducer