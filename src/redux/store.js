import { configureStore } from '@reduxjs/toolkit';

import apiReducer from './api/apiSlice';
import catalogoReducer from './api/catalogoSlice';
import carritoReducer from './api/carritoSlice';
import valesReducer from './api/valesSlice';

export const store = configureStore({
	reducer: {
		api: apiReducer,
		catalogo: catalogoReducer,
		carrito: carritoReducer,
		vales: valesReducer
	},
});
