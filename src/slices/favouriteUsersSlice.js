import { getFavouriteUsersFromStorage, saveFavouriteUsersToStorage } from "../service/favouriteUsers";

const { createSlice } = require("@reduxjs/toolkit");

const favouriteUsersSlice = createSlice({
    name: 'favouriteUsers',
    initialState: getFavouriteUsersFromStorage(),
    reducers: {
        addFavUser(state, action) {
            let newFavUsers = [...state, action.payload]
            saveFavouriteUsersToStorage(newFavUsers)
            return newFavUsers
        },
        removeFavUser(state, action) {
            let newFavUsers = state.filter(x => x != action.payload)
            saveFavouriteUsersToStorage(newFavUsers)
            return newFavUsers
        }
    }
})

export const getFavUsers = state => state.favouriteUsers
export const {addFavUser, removeFavUser} = favouriteUsersSlice.actions
export const favUserReducer = favouriteUsersSlice.reducer
