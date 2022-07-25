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
		urlBase: 'https://p01-ws.hefame.es',
		urlFedicom: 'https://fedicom3-dev.hefame.es',
		urlTicket: 'https://ticket.hefame.es',
		jwtFedicom: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlbXBsZWFkbyIsImF1ZCI6ImVtcGxlYWRvIiwiZXhwIjo5OTk5OTk5OTk5LCJpYXQiOjEsInBlcm1hbmVudGUiOnRydWV9.ZRuw8c5uhQDpBRrJd4F__4uSSYnF4d50mUC-SsZAMOk",
		usuario: {
			estado: 'inicial',
			datos: {
				jwt: null,
				codigoPedidos: null,
				codigo: null,
				almacen: null,
				nombre: null,
				apellidos: null,
				foto: null
			},
			error: null
		}
	},
	reducers: {
		setApiUrlBase: (state, action) => {
			state.urlBase = action.payload;
		},
		logout: (state, _) => {
			state.usuario.datos.jwt = null;
			state.usuario.datos.codigoPedidos = null;
			state.usuario.datos.codigo = null;
			state.usuario.datos.almacen = null;
			state.usuario.datos.nombre = null;
			state.usuario.datos.apellidos = null;
			state.usuario.datos.foto = null;
			state.usuario.estado = 'inicial';
			state.usuario.error = null;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(solicitarToken.pending, (state) => {
				state.usuario.datos.jwt = null;
				state.usuario.datos.codigoPedidos = null;
				state.usuario.datos.codigo = null;
				state.usuario.datos.almacen = null;
				state.usuario.datos.nombre = null;
				state.usuario.datos.apellidos = null;
				state.usuario.datos.foto = null;
				state.usuario.estado = 'cargando';
				state.usuario.error = null;
			})
			.addCase(solicitarToken.fulfilled, (state, action) => {
				state.usuario.datos.jwt = action.payload.jwt;
				state.usuario.datos.codigoPedidos = action.payload.codigoPedidos;
				state.usuario.datos.codigo = action.payload.codigo;
				state.usuario.datos.almacen = action.payload.almacen;
				state.usuario.datos.nombre = action.payload.nombre;
				state.usuario.datos.apellidos = action.payload.apellidos;
				state.usuario.datos.foto = action.payload.foto;
				state.usuario.estado = 'completado';
				state.usuario.error = null;
			})
			.addCase(solicitarToken.rejected, (state, action) => {
				state.usuario.datos.jwt = null;
				state.usuario.datos.codigoPedidos = null;
				state.usuario.datos.codigo = null;
				state.usuario.datos.almacen = null;
				state.usuario.datos.nombre = null;
				state.usuario.datos.apellidos = null;
				state.usuario.datos.foto = null;
				state.usuario.estado = 'error';
				state.usuario.error = action.payload;
			});
	},
});



export const { setApiUrlBase, logout } = apiSlice.actions;
export default apiSlice.reducer;
