import React from 'react';

import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';


export const pantallaSlice = createSlice({
	name: 'api',
	initialState: {
		titulo: 'App del empleado'
	},
	reducers: {
		setTituloPantalla: (state, action) => {
			state.titulo = action.payload
		}
	}
});

export function usePantalla(titulo) {
	let dispatch = useDispatch();
	let pantalla = useSelector(state => state.pantalla);

	React.useEffect(() => {
		if (pantalla.titulo !== titulo) {
			dispatch(setTituloPantalla({ titulo }))
		}
	})
	return pantalla;
}

export const { setTituloPantalla } = pantallaSlice.actions;
export default pantallaSlice.reducer;
