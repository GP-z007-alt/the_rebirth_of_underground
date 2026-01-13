import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const getProduct = createAsyncThunk('products/getProducts',async(_,{rejectWithValue})=>{
    try{
        const link = '/api/v1/products';
        const {data} = await axios.get(link);
        // console.log(data);
        return data;

    }catch(error){
        return rejectWithValue(error.response ? error.response.data : 'An error occurred');
    }
})


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
  },
  extraReducers:(builder) => {
    builder
    .addCase(getProduct.pending,(state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(getProduct.fulfilled,(state,action) => {
        console.log(action.payload);
        state.loading = false;
        state.error = null;
        state.products = action.payload.products;
        state.productCount = action.payload.productCount;
    })
    .addCase(getProduct.rejected,(state) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
    })
}
})

export const {removeErrors} = productSlice.actions;
export default productSlice.reducer;