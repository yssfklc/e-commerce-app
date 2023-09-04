import {configureStore} from '@reduxjs/toolkit';
import addProductSlice from '../features/addProductSlice';
import addBasketSlice from '../features/addBasketSlice';
import addSessionSlice from '../features/sessionSlice';

const store = configureStore({
    reducer: {
        allProducts: addProductSlice,
        basket: addBasketSlice,
        users: addSessionSlice
    }
});

export default store;