import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SAP from 'api/sap';



export const descargarNominaPdf = createAsyncThunk('nominaPdf/descargarNominaPdf',
	async ({ ano, mes, modoVisualizacion }, redux) => {
		try {
			let respuesta = await SAP(redux).descargarNominaPdf(mes, ano);
			return redux.fulfillWithValue({ pdf: respuesta, modoVisualizacion });
		} catch (error) {
			let mensaje = SAP.generarErrorFetch(error);
			return redux.rejectWithValue({ error: mensaje, modoVisualizacion });
		}
	}
);


export const nominaPdfSlice = createSlice({
	name: 'nominaPdf',
	initialState: {
		estado: 'inicial',
		error: null,
		pdf: null,
		modoVisualizacion: null
	},
	reducers: {
		completarDescargaNominaPdf: (state) => {
			state.modoVisualizacion = 'completado'
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(descargarNominaPdf.pending, (state) => {
				state.estado = 'cargando';
				state.error = null;
				state.pdf = null;
				state.modoVisualizacion = 'completado';
			})
			.addCase(descargarNominaPdf.fulfilled, (state, action) => {
				let { pdf, modoVisualizacion } = action.payload;
				state.estado = 'completado';
				state.error = null;
				state.pdf = pdf;
				state.modoVisualizacion = modoVisualizacion;
			})
			.addCase(descargarNominaPdf.rejected, (state, action) => {
				let { error, modoVisualizacion } = action.payload;
				state.estado = 'error';
				state.error = error;
				state.pdf = null;
				state.modoVisualizacion = modoVisualizacion;
			});
	},
});

export const { completarDescargaNominaPdf } = nominaPdfSlice.actions;
export default nominaPdfSlice.reducer;
