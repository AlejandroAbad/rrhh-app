import { configureStore } from '@reduxjs/toolkit';

import pantallaReducer from './pantallaSlice';
import apiReducer from './api/apiSlice';
import anticiposReducer from './api/anticiposSlice';
import catalogoReducer from './api/catalogoSlice';
import carritoReducer from './api/carritoSlice';
import valesReducer from './api/valesSlice';
import albaranPdfReducer from './api/albaranPdfSlice';
import nominaPdfReducer from './api/nominaPdfSlice';
import accesosReducer from './api/accesosSlice';
import ticketsReducer from './api/ticketsSlice';


const loadState = () => {
	//localStorage.removeItem('estadoAppEmp');
	try {
		const estadoSerializado = localStorage.getItem('estadoAppEmp');
		if (estadoSerializado === null) return undefined;
		return JSON.parse(estadoSerializado);
	} catch (e) {
		console.log(e);
		return undefined;
	}
}

const saveState = (state) => {
	try {
		const estadoSerializado = JSON.stringify(state);
		localStorage.setItem('estadoAppEmp', estadoSerializado);
	} catch (e) {
		console.log(e);
	}
}

export const store = configureStore({
	reducer: {
		api: apiReducer,
		catalogo: catalogoReducer,
		carrito: carritoReducer,
		vales: valesReducer,
		albaranPdf: albaranPdfReducer,
		nominaPdf: nominaPdfReducer,
		pantalla: pantallaReducer,
		accesos: accesosReducer,
		tickets: ticketsReducer,
		anticipos: anticiposReducer,
	},
	preloadedState: loadState()
});

store.subscribe(() => {
	let state = store.getState();
	saveState({
		api: state.api,
		carrito: {
			materiales: state.carrito.materiales
		}
	})
})