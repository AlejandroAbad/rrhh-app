import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import SAP from 'api/sap';

export const solicitarToken = createAsyncThunk('api/solicitarToken',
	async ({ usuario, password }, redux) => {

		try {
			let respuesta = await SAP(redux).autenticar(usuario, password);
			return redux.fulfillWithValue(respuesta);
		} catch (error) {
			let mensaje = SAP.generarErrorFetch(error);
			return redux.rejectWithValue(mensaje);
		}

	}
);




export const apiSlice = createSlice({
	name: 'api',
	initialState: {
		urlBase: 'https://t01-ws.hefame.es',
		urlFedicom: 'https://fedicom3-dev.hefame.es',
		jwtFedicom: "123",
		usuario: {
			estado: 'inicial',
			datos: { jwt: null, kunnr: null, pernr: null, werks: null, },
			error: null
		}
	},
	reducers: {
		setApiUrlBase: (state, action) => {
			state.urlBase = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(solicitarToken.pending, (state) => {
				state.usuario.datos.jwt = null;
				state.usuario.datos.kunnr = null;
				state.usuario.datos.pernr= null;
				state.usuario.datos.werks= null;
				state.usuario.estado = 'cargando';
				state.usuario.error = null;
			})
			.addCase(solicitarToken.fulfilled, (state, action) => {
				state.usuario.datos.jwt = action.payload.jwt;
				state.usuario.datos.kunnr = action.payload.kunnr;
				state.usuario.datos.pernr = action.payload.pernr;
				state.usuario.datos.werks = action.payload.werks;
				state.usuario.estado = 'completado';
				state.usuario.error = null;
			})
			.addCase(solicitarToken.rejected, (state, action) => {
				state.usuario.datos.jwt = null;
				state.usuario.datos.kunnr = null;
				state.usuario.datos.pernr = null;
				state.usuario.datos.werks = null;
				state.usuario.estado = 'error';
				state.usuario.error = action.payload;
			});
	},
});



export const { setApiUrlBase } = apiSlice.actions;
export default apiSlice.reducer;
