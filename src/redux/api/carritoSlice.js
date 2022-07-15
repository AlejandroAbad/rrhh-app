import { createSlice } from '@reduxjs/toolkit';



export const carritoSlice = createSlice({
	name: 'carrito',
	initialState: {
		materiales: []
	},
	reducers: {
		setMaterialEnCarrito: (state, action) => {
			if (!action.payload.cantidad) {
				state.materiales = [...state.materiales.filter(m => m.codigo !== action.payload.codigo)]
			} else {
				state.materiales = [action.payload, ...state.materiales.filter(m => m.codigo !== action.payload.codigo)];
			}
		},
		addMaterialEnCarrito: (state, action) => {
			if (parseInt(action.payload.cantidad) > 0) {
				if (state.materiales.find(m => m.codigo === action.payload.codigo)) {
					state.materiales = state.materiales.map(m => {
						if (m.codigo !== action.payload.codigo) return m;
						let nuevaCantidad = m.cantidad + parseInt(action.payload.cantidad)
						return { ...m, cantidad: nuevaCantidad }
					});
				} else {
					state.materiales = [action.payload, ...state.materiales];
				}
			}
		},
	}
});



export const { setMaterialEnCarrito, addMaterialEnCarrito } = carritoSlice.actions;
export default carritoSlice.reducer;
