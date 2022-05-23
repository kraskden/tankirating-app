import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_DIFF_FORMAT, FULL_DIFF_FORMAT, TIME_PERIODS } from "../lib/constants";
import { apiLoadDiffs, apiLoadDiffsByOffset } from "../service/diffs";
import { singleLoadState } from "../util/slices";

let initialState = {}
TIME_PERIODS.forEach(p => {
  initialState[p] = { ...singleLoadState }
})


function addThunksCases(builder, thunks) {
  for (const thunk of thunks) {
    builder
      .addCase(thunk.pending, (state, action) => {
        state[action.period].status = 'loading'
      })
      .addCase(thunk.fulfilled, (state, action) => {
        state[action.period].status = 'ok'
        state[action.period].data = action.payload
      })
      .addCase(thunk.rejected, (state, action) => {
        state[action.period].status = 'error'
        state[action.period].error = action.payload
      })
  }
}

const diffSliceFactory = (format, loadEvents) => createSlice({
  name: `${format.toLowerCase()}Diffs`,
  initialState,
  reducers: {
    eraseAll(state, action) {
      return { ...initialState }
    },
    erasePeriod(state, action) {
      const { period } = action.payload
      initialState[period] = { ...singleLoadState }
    }
  },
  extraReducers(builder) {
    addThunksCases(builder, loadEvents)
  }
})

const loadDiffFactory = (format) => createAsyncThunk(`${format.toLowerCase()}Diff/load`, async (from, to, period, { getState }) => {
  const targetId = getState().target.data.id
  const { data } = await apiLoadDiffs(targetId, period, from, to, format)
  return {
    period,
    from,
    to,
    data
  }
})

const loadDiffByOffsetsFactory = (format) => createAsyncThunk(`${format.toLowerCase()}Diff/load`, async (offsetFrom, offsetTo, period, { getState }) => {
  const targetId = getState().target.data.id
  const { data } = await apiLoadDiffsByOffset(targetId, period, offsetFrom, offsetTo, format)
  return {
    period,
    from: null,
    to: null,
    data
  }
})

export const loadBaseDiffs = loadDiffFactory(BASE_DIFF_FORMAT)
export const loadFullDiffs = loadDiffFactory(FULL_DIFF_FORMAT)
export const loadBaseDiffsByOffset = loadDiffByOffsetsFactory(BASE_DIFF_FORMAT)
export const loadFullDiffsByOffset = loadDiffByOffsetsFactory(FULL_DIFF_FORMAT)

const baseDiffSlice = diffSliceFactory(BASE_DIFF_FORMAT, [loadBaseDiffsByOffset])
const fullDiffSlice = diffSliceFactory(FULL_DIFF_FORMAT, [loadFullDiffsByOffset])


export const getDiffs = (format, period) => (state) => {
  const property = `${format.toLowerCase()}Diffs`
  console.log(state, property, period)
  return state[property][period]
}


export const baseDiffErasePeriod = baseDiffSlice.actions.erasePeriod
export const baseDiffEraseAll = baseDiffSlice.actions.eraseAll
export const fullDiffErasePeriod = fullDiffSlice.actions.erasePeriod
export const fullDiffEraseAll = fullDiffSlice.actions.eraseAll

export const baseDiffReducer = baseDiffSlice.reducer
export const fullDiffReducer = fullDiffSlice.reducer