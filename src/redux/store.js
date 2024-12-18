import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import authReducer from './features/auth/authSlice'
import { authApi } from './features/auth/authApi'
import productsApi from './features/products/productsApi'
import reviewsApi from './features/reviews/reviewsApi'
import statsApi from './features/stats/statsApi'
import orderApi from './features/orders/ordersApi'



export const store = configureStore({
  reducer: {
     cart: cartReducer,
     [authApi.reducerPath]:authApi.reducer,
     auth: authReducer,
     [productsApi.reducerPath]: productsApi.reducer,
     [reviewsApi.reducerPath]:reviewsApi.reducer,
     [statsApi.reducerPath]:statsApi.reducer,
     [orderApi.reducerPath]:orderApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(authApi.middleware,productsApi.middleware,
      reviewsApi.middleware,statsApi.middleware,orderApi.middleware
    )
})