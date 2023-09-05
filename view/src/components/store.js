import {configureStore} from '@reduxjs/toolkit';
import addProductSlice from '../features/addProductSlice';
import addBasketSlice from '../features/addBasketSlice';
import addSessionSlice from '../features/sessionSlice';
import addLogoutSlice from '../features/logoutSlice';

const store = configureStore({
    reducer: {
        allProducts: addProductSlice,
        basket: addBasketSlice,
        users: addSessionSlice,
        logout: addLogoutSlice
    }
});

export default store;