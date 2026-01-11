import {createSlice} from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState:{
    products:[],
    productCount:0,
    loading:false,
    error:null
  },
  reducers:{
    removeErrors:(state) => {
      state.error = null;
    }
  }
})

export const {removeErrors} = productSlice.actions;
export default productSlice.reducer;