import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { TIME_PERIODS } from "../lib/constants"
import { apiLoadDiffs, apiLoadDiffsByOffset } from "../service/diffs"
import {singleLoadState} from '../util/slices'

let initialDiffState = {
  period: "day",
  periods: {}
}
TIME_PERIODS.map(p => initialDiffState.periods[p] = {...singleLoadState})

const initialState = {
  format: "base",
  base: {...initialDiffState},
  full: {...initialDiffState}
}

const getPeriods = (state) => state[state.format].periods
const getActivePeriod = (state) => state[state.format].period
const getActivePeriodData = (state) => getPeriods(state)[getActivePeriod(state)]

const diffSlice = createSlice({
  name: 'diff',
  initialState,
  reducers: {
    setFormatAndPeriod(state, action) {
      const {format, period} = action.payload
      state.format = format
      state[format].period = period
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadDiffsByOffsets.pending, (state, action) => {
        getActivePeriodData(state).status = 'loading'
      })
      .addCase(loadDiffsByOffsets.fulfilled, (state, action) => {
        getActivePeriodData(state).status = 'ok'
        getActivePeriodData(state).data = action.payload
      })
      .addCase(loadDiffsByOffsets.rejected, (state, action) => {
        getActivePeriodData(state).status = 'error'
        getActivePeriodData(state).error = action.payload
        getActivePeriodData(state).data = null
      })
  }
})

// Actions 
export const {setFormatAndPeriod} = diffSlice.actions

export const loadDiffsByOffsets = createAsyncThunk('diff/load', async ({offsetFrom, offsetTo}, {getState}) => {
  const format = getState().diffs.format
  const period = getActivePeriod(getState().diffs)
  const targetId = getState().target.data.id 
  const {data} = await apiLoadDiffsByOffset(targetId, period, offsetFrom, offsetTo, format)
  data.forEach(e => {
    e.kd = e.deaths ? e.kills / e.deaths : null;
  })
  return data
})


// Selectors 

export const getFormatAndPeriod = (state) => ({
  format: state.diffs.format,
  period: getActivePeriod(state.diffs)
})

export const getDiffs = (state) => getActivePeriodData(state.diffs)

// Reducer
export const diffReducer = diffSlice.reducer