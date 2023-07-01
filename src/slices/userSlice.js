const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const getUser = state => state.user

export const getAdmin = state => {
  if (!state.user) {
    return null
  }
  let is_admin = state.user.authorities.filter(x => x.authority === 'ROLE_ADMIN').length > 0
  return is_admin ? state.user : null
}

export const {setUser} = userSlice.actions
export const userReducer = userSlice.reducer
