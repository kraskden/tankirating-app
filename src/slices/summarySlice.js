import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {TIME_PERIODS} from '../lib/constants'
import { apiLoadSummaryForDateRange, apiLoadSummaryForPeriod } from "../service/summary"
import { addThunkReducers, getIdleState } from "../util/slices"

function initialState() {
  let base = {}
  for (const p of TIME_PERIODS) {
    base[p] = {}
  }
  base.custom = {}
  return base
}

const targetFn = (state, action) => {
  const {period, offset} = action.meta.arg 
  return [state[period], offset]
}

const customTargetFn = (state, action) => {
  return [state.custom, 0]
}

const summarySlice = createSlice({
  name: 'summary',
  initialState: initialState(),
  reducers:  {
    eraseSummary() {
      return initialState()
    }
  },
  extraReducers(builder) {
    addThunkReducers(builder, loadSummary, targetFn)
    addThunkReducers(builder, loadCustomSummary, customTargetFn)
  }
})

export const loadSummary = createAsyncThunk('summary/load', async ({period, offset}, {getState}) => {
  const targetId = getState().target.data.id 
  const {data} = await apiLoadSummaryForPeriod(targetId, period, offset, 'FULL')
  return data
})

export const loadCustomSummary = createAsyncThunk('summary/custom/load', async ({from, to}, {getState}) => {
  const targetId = getState().target.data.id 
  const {data} = await apiLoadSummaryForDateRange(targetId, from, to, 'FULL')
  return data
})

export const getSummarySelector = (period, offset) => state => {
  const slice = state.summary[period]
  return slice[offset] ?? getIdleState()
}

export const {eraseSummary} = summarySlice.actions

export const summaryReducer = summarySlice.reducer