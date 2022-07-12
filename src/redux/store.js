import { configureStore } from '@reduxjs/toolkit';

import apiReducer from './api/apiSlice';
import catalogoReducer from './api/catalogoSlice';
import carritoReducer from './api/carritoSlice';

export const store = configureStore({
	reducer: {
		api: apiReducer,
		catalogo: catalogoReducer,
		carrito: carritoReducer
	},
});
