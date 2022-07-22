import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SAP from 'api/sap';


export const consultarAnticipos = createAsyncThunk('anticipos/consultarAnticipos',
	async (_, redux) => {

		try {
			let respuesta = await SAP(redux).consultarAnticipos();
			return redux.fulfillWithValue(respuesta);
		} catch (error) {
			let mensaje = SAP.generarErrorFetch(error);
			return redux.rejectWithValue(mensaje);
		}
	}
);



export const anticiposSlice = createSlice({
	name: 'anticipos',
	initialState: {
		estado: 'inicial',
		resultado: null,
		error: null
	},
	extraReducers: (builder) => {
		builder
			.addCase(consultarAnticipos.pending, (state) => {
				state.resultado = null;
				state.estado = 'cargando';
				state.error = null;
			})
			.addCase(consultarAnticipos.fulfilled, (state, action) => {
				state.resultado = action.payload;
				state.estado = 'completado';
				state.error = null;
			})
			.addCase(consultarAnticipos.rejected, (state, action) => {
				state.resultado = null;
				state.estado = 'error';
				state.error = action.payload;
			});
	},
});



//export const { limpiarEstadoConsulta } = anticiposSlice.actions;
export default anticiposSlice.reducer;
