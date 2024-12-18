import { createSlice } from '@reduxjs/toolkit'

const initialState = {
      products:[],
      selectedItems:0,
      totalPrice:0,
      tax:0,
      taxRate:0.05,
      grandTotal:0
}

export const cartSlice =createSlice({
    name:'cart',
    initialState,
    reducers:{
        addTocart:(state,action)=>{
            
            const isExist=state.products.find((product)=>product.id === action.payload._id);
           
            if(!isExist){
                state.products.push({...action.payload,quantity:1})
            }else{
                console.log("item is already added to the cart")
            }
            state.selectedItems=setSelectedItems(state);
            state.totalPrice=setTotalPrice(state);
            state.tax=setTax(state);
            state.grandTotal=setGrandTotal(state);
        },
        updateQuantity:(state,action)=>{
            const products=state.products.map((product)=>{
                if(product.id===action.payload.id){
                    if(action.payload.type ==='increment'){
                        product.quantity += 1;
                    }else if(action.payload.type ==='decrement'){
                        if(product.quantity >1){
                          product.quantity -= 1;
                        }
                    }
                }

                return product;
            });
            state.selectedItems=setSelectedItems(state);
            state.totalPrice=setTotalPrice(state);
            state.tax=setTax(state);
            state.grandTotal=setGrandTotal(state);
        },
        removeFromCart:(state,action)=>{
            // Update the state with the new array with those product which we dont want to remove
             state.products=state.products.filter((product)=>product.id !== action.payload.id);

             state.selectedItems=setSelectedItems(state);
             state.totalPrice=setTotalPrice(state);
             state.tax=setTax(state);
             state.grandTotal=setGrandTotal(state);
        },
        clearCart:(state,action)=>{
            state.products=[];
            state.selectedItems=0;
            state.totalPrice=0;
            state.tax=0;
            state.grandTotal=0;
        }
    }
})

//utilites functions
export const setSelectedItems=(state)=>state.products.reduce((total,product)=>{
    return Number(total + product.quantity)
},0)

export const setTotalPrice=(state)=>state.products.reduce((total,product)=>{
    return Number(total + product.quantity * product.price)
},0)
export const setTax=(state)=>setTotalPrice(state) * state.taxRate;

export const setGrandTotal=(state)=>{
    return setTotalPrice(state) + setTotalPrice(state) *   state.taxRate;  
}

export const{addTocart,updateQuantity,removeFromCart,clearCart}=cartSlice.actions;
export default cartSlice.reducer;