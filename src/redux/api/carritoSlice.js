import { createSlice } from '@reduxjs/toolkit';



export const carritoSlice = createSlice({
	name: 'carrito',
	initialState: {
		materiales: []
	},
	reducers: {
		setMaterial: (state, action) => {
			if (action.payload.cantidad === 0) {
				state.materiales = [...state.materiales.filter(m => m.codigo === action.payload.codigo)]
			} else {
			state.materiales = [action.payload, ...state.materiales.filter(m => m.codigo !== action.payload.codigo)];
			}
		}
	}
});



export const { setMaterial } = carritoSlice.actions;
export default carritoSlice.reducer;
