import { configureStore } from '@reduxjs/toolkit';

import apiReducer from './api/apiSlice';
import catalogoReducer from './api/catalogoSlice';
import carritoReducer from './api/carritoSlice';
import valesReducer from './api/valesSlice';
import albaranPdfReducer from './api/albaranPdfSlice';
import nominaPdfReducer from './api/nominaPdfSlice';
import pantallaReducer from './pantallaSlice';

export const store = configureStore({
	reducer: {
		api: apiReducer,
		catalogo: catalogoReducer,
		carrito: carritoReducer,
		vales: valesReducer,
		albaranPdf: albaranPdfReducer,
		nominaPdf: nominaPdfReducer,
		pantalla: pantallaReducer
	},
});
