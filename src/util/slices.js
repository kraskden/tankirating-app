
export const singleLoadState = {
  data: null,
  error: null,
  status: 'idle'
}

export const getIdleState = () => (
  {data: null, error: null, status: 'idle'}
)

export const getLoadingState = () => (
  {data: null, error: null, status: 'loading'}
)

export const getOkState = (result) => (
  {data: result, error: null, status: 'ok'}
) 

export const getErrorState = (err) => (
  {data: null, error: err, status: 'error'}
)

/**
 * Generic function to register thunk reducers
 * @param {*} builder Reducer builder
 * @param {*} thunk Async thunk
 * @param {(state, action) => [stateProj, setProperty: String]} targetFn Function
 */
export const addThunkReducers = (builder, thunk, targetFn) => {
  builder
    .addCase(thunk.pending, (state, action) => {
      const newState = getLoadingState()
      if (!targetFn) {
        return newState
      } else {
        const [obj, prop] = targetFn(state, action)
        obj[prop] = newState
      }
    })
    .addCase(thunk.fulfilled, (state, action) => {
      const newState = getOkState(action.payload)
      if (!targetFn) {
        return newState
      } else {
        const [obj, prop] = targetFn(state, action)
        obj[prop] = newState
      }
    })
    .addCase(thunk.rejected, (state, action) => {
      const newState = getErrorState(action.payload)
      if (!targetFn) {
        return newState
      } else {
        const [obj, prop] = targetFn(state, action)
        obj[prop] = newState
      }
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