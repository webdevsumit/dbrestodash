import { createSlice} from '@reduxjs/toolkit'

const initialState= {
  isLoanding: false,
  currentStoreInfoId: '',
  currentUserProfileId: '',
  searchedText: ""
}

export const navbarSlice = createSlice({
  name: 'navbarSlice',
  initialState,
  reducers: {

    setIsLoading: (state, action) => {
      state.isLoanding = action.payload
    },
    setCurrentStoreInfoId: (state, action) => {
      state.currentStoreInfoId = action.payload
    },
    setCurrentUserProfileId: (state, action) => {
      state.currentUserProfileId = action.payload
    },
    setSearchedText: (state, action) => {
      state.searchedText = action.payload
    },

  },
})

export const { setIsLoading, setCurrentStoreInfoId, setCurrentUserProfileId, setSearchedText } = navbarSlice.actions;

export default navbarSlice.reducer;