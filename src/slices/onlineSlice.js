import { apiLoadCcu, apiLoadCurrentPcu, apiLoadMomentaryOnline, apiLoadPcu } from "../service/online"
import { addThunkReducers, getIdleState } from "../util/slices"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState = {
  momentary: getIdleState(),
  ccu: getIdleState(),
  pcu: {},
  currentPcu: getIdleState()
}

const onlineSlice = createSlice({
  name: 'online',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    addThunkReducers(builder, loadMomentary, (s) => [s, 'momentary'])
    addThunkReducers(builder, loadCcu, (s) => [s, 'ccu'])
    addThunkReducers(builder, loadPcu, (state, action) => {
      const {period} = action.meta.arg 
      return [state.pcu, period]
    })
    addThunkReducers(builder, loadCurrentPcu, (s) => [s, 'currentPcu'])
  }
})

// Actions

export const loadMomentary = createAsyncThunk('online/momentary/load', apiLoadMomentaryOnline)

export const loadCcu = createAsyncThunk('online/ccu/load', async ({from, to}) => apiLoadCcu(from, to) )
export const loadCcuForDatePeriod = (datePeriod) => loadCcu({
    from: datePeriod.startDate,
    to: datePeriod.endDate
  })

export const loadPcu = createAsyncThunk('online/pcu/load', async ({period, from, to}) => apiLoadPcu(period, from, to))
export const loadPcuForDatePeriod = (datePeriod) => loadPcu({
  period: datePeriod.name,
  from: datePeriod.startDate,
  to: datePeriod.endDate
})

export const loadCurrentPcu = createAsyncThunk('online/currentPcu/load', apiLoadCurrentPcu)

// Selectors

export const getMomentary = (state) => state.online.momentary
export const getCcu = (state) => state.online.ccu
export const getPcuSelector = (period) => state => state.online.pcu[period] || getIdleState()
export const getCurrentPcu = state => state.online.currentPcu

// Reducer
export const onlineReducer = onlineSlice.reducer