import { createSlice} from '@reduxjs/toolkit'

const initialState= {
  isLoanding: false,
  authdata: {}
}

export const navbarSlice = createSlice({
  name: 'navbarSlice',
  initialState,
  reducers: {

    setIsLoading: (state, action) => {
      state.isLoanding = action.payload
    },
    setAuthData: (state, action) => {
      state.authdata = action.payload;
    },

  },
})

export const { 
  setIsLoading,
  setAuthData,
} = navbarSlice.actions;

export const getIsLoading = store => store.navbar.isLoanding; 
export const getAuthData = store => store.navbar.authdata; 

export default navbarSlice.reducer;