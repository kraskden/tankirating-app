import { apiLoadRating } from "../service/ratings";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const { TIME_PERIODS } = require("../lib/constants");
const { getIdleState, addThunkReducers } = require("../util/slices");

const initialState = TIME_PERIODS.reduce((acc, curr) => {
  acc[curr] = {}
  return acc
}, {})

const targetFn = (state, action) => {
  const {period, offset} = action.meta.arg 
  return [state[period], offset]
}

const ratingSlice = createSlice({
  name: 'rating',
  initialState,
  extraReducers(builder) {
    addThunkReducers(builder, loadRating, targetFn)
  }
})


export const getRatingSelector = (period, offset) => state => {
  const slice = state.rating[period]
  return slice[offset] || getIdleState()
}

export const loadRating = createAsyncThunk('rating/load', async ({period, offset, queryParams}) => 
  apiLoadRating(period, offset, queryParams))

export const ratingReducer = ratingSlice.reducer
