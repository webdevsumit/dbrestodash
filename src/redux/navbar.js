import { createSlice} from '@reduxjs/toolkit'

const initialState= {
  isLoanding: false,
  authdata: {},
  itemsInCart: 0
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
    setItemsInCart: (state, action) => {
      state.itemsInCart = action.payload;
    },

  },
})

export const { 
  setIsLoading,
  setAuthData,
  setItemsInCart
} = navbarSlice.actions;

export const getIsLoading = store => store.navbar.isLoanding; 
export const getAuthData = store => store.navbar.authdata; 
export const getItemsInCart = store => store.navbar.itemsInCart

export default navbarSlice.reducer;