import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTimeHeatMap } from "../service/heatMap";
import { addThunkReducers, singleLoadState } from "../util/slices";

const initialState = singleLoadState


const heatMapSlice = createSlice({
  name: 'heatMap',
  initialState,
  reducers: {
    eraseHeatMap(state, action) {
      return {...initialState}
    }
  },
  extraReducers(builder) {
    addThunkReducers(builder, loadHeatMap)
  }
})

export const loadHeatMap = createAsyncThunk('heatMap/load', async (year, {getState}) => {
  const targetId = getState().target.data.id 
  const {data} = await getTimeHeatMap(targetId, year)
  return data
})

export const getHeatMap = (state) => state.heatMap

export const {eraseHeatMap} = heatMapSlice.actions
export const heatMapReducer = heatMapSlice.reducer