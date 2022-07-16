import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SAP from 'api/sap';


export const consultarVales = createAsyncThunk('vales/consultarVales',
	async ({ mes, ano }, redux) => {

		try {
			let respuesta = await SAP(redux).consultaVales(mes, ano);
			return redux.fulfillWithValue(respuesta);
		} catch (error) {
			let mensaje = SAP.generarErrorFetch(error);
			return redux.rejectWithValue(mensaje);
		}
	}
);

export const consultarPdf = createAsyncThunk('vales/consultarPdf',
	async ({ numeroAlbaran }, redux) => {
		try {
			let respuesta = await SAP(redux).descargarAlbaranPdf(numeroAlbaran);
			return redux.fulfillWithValue(respuesta);
		} catch (error) {
			let mensaje = SAP.generarErrorFetch(error);
			return redux.rejectWithValue(mensaje);
		}
	}
);


export const valesSlice = createSlice({
	name: 'vales',
	initialState: {
		listado: {
			estado: 'inicial',
			resultado: null,
			error: null
		},
		detalle: {
			estado: 'inicial',
			resultado: null,
			error: null
		}
	},
	reducers: {
		limpiarEstadoConsulta: (state, _) => {
			state.listado.estado = 'inicial';
			state.listado.resultado = null;
			state.listado.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(consultarVales.pending, (state) => {
				state.listado.resultado = null;
				state.listado.estado = 'cargando';
				state.listado.error = null;
			})
			.addCase(consultarVales.fulfilled, (state, action) => {
				state.listado.resultado = action.payload;
				state.listado.estado = 'completado';
				state.listado.error = null;
			})
			.addCase(consultarVales.rejected, (state, action) => {
				state.listado.resultado = null;
				state.listado.estado = 'error';
				state.listado.error = action.payload;
			})
			.addCase(consultarPdf.pending, (state) => {
				state.detalle.resultado = null;
				state.detalle.estado = 'cargando';
				state.detalle.error = null;
			})
			.addCase(consultarPdf.fulfilled, (state, action) => {
				state.detalle.resultado = action.payload;
				state.detalle.estado = 'completado';
				state.detalle.error = null;
			})
			.addCase(consultarPdf.rejected, (state, action) => {
				state.detalle.resultado = null;
				state.detalle.estado = 'error';
				state.detalle.error = action.payload;
			});
	},
});



export const { limpiarEstadoConsulta } = valesSlice.actions;
export default valesSlice.reducer;
