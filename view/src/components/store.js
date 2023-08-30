import {configureStore} from '@reduxjs/toolkit';
import addProductSlice from '../features/addProductSlice';
import addBasketSlice from '../features/addBasketSlice';

const store = configureStore({
    reducer: {
        allProducts: addProductSlice,
        basket: addBasketSlice
    }
});

export default store;