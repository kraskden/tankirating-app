
export const singleLoadState = {
  data: null,
  error: null,
  status: 'idle'
}

export const addThunkReducers = (builder, thunk, onSuccess) => {
  builder
    .addCase(thunk.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(thunk.fulfilled, (state, action) => {
      state.status = 'ok'
      onSuccess ? onSuccess(state, action) : state.data = action.payload
    })
    .addCase(thunk.rejected, (state, action) => {
      state.status = 'error'
      state.error = action.payload
    })
}



export function getSelectors(stateProj) {
  return [
    (state) => stateProj(state).status,
    (state) => stateProj(state).data,
    (state) => stateProj(state).error
  ]
}

export function getData(stateProj) {
  return (state) => stateProj(state).data
}