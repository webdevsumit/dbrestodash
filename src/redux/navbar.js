import { createSlice} from '@reduxjs/toolkit'

const initialState= {
  isLoanding: false,
  authdata: {},
  itemsInCart: 0,
  creatingOrder: null
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
    setCreatingOrder: (state, action) => {
      state.creatingOrder = action.payload
    }

  },
})

export const { 
  setIsLoading,
  setAuthData,
  setItemsInCart,
  setCreatingOrder
} = navbarSlice.actions;

export const getIsLoading = store => store.navbar.isLoanding; 
export const getAuthData = store => store.navbar.authdata; 
export const getItemsInCart = store => store.navbar.itemsInCart;
export const getCreatingOrder = store => store.navbar.creatingOrder;

export default navbarSlice.reducer;