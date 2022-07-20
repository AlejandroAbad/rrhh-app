import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import TICKET from 'api/tickets';


export const consultarTickets = createAsyncThunk('tickets/consultarTickets',
	async ({ emails }, redux) => {

		try {
			let respuesta = await TICKET(redux).consultarTickets(emails);
			return redux.fulfillWithValue(respuesta);
		} catch (error) {
			let mensaje = TICKET.generarErrorFetch(error);
			return redux.rejectWithValue(mensaje);
		}
	}
);


export const crearTicket = createAsyncThunk('tickets/crearTicket',
	async (ticket, redux) => {

		/*
		let ticket = {
			"name": "Angry User",
			"email": "api@osticket.com",
			"phone": "3185558634X12345",
			"subject": "Testing API",
			"message": "MESSAGE HERE",
			"attachments": [
				{ "file.doc": "data:text/plain;base64,/9j/4Aelc//Z" },
				{ "image.png": "data:text/plain;base64,/9j/4Aelc//Z" }
			]
		}
		*/

		try {
			let respuesta = await TICKET(redux).crearTicket(ticket);
			return redux.fulfillWithValue(respuesta);
		} catch (error) {
			let mensaje = TICKET.generarErrorFetch(error);
			return redux.rejectWithValue(mensaje);
		}
	}
);



export const ticketsSlice = createSlice({
	name: 'tickets',
	initialState: {
		creacion: {
			estado: 'inicial',
			numeroTicket: null,
			error: null
		},
		consulta: {
			estado: 'inicial',
			tickets: null,
			error: null
		}
	},
	reducers: {
		limpiarEstadoConsulta: (state, _) => {
			state.consulta.estado = 'inicial';
			state.consulta.tickets = null;
			state.consulta.error = null;
		},
		limpiarEstadoCreacion: (state, _) => {
			state.creacion.estado = 'inicial';
			state.creacion.numeroTicket = null;
			state.creacion.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(consultarTickets.pending, (state) => {
				state.consulta.tickets = null;
				state.consulta.estado = 'cargando';
				state.consulta.error = null;
			})
			.addCase(consultarTickets.fulfilled, (state, action) => {
				state.consulta.tickets = action.payload;
				state.consulta.estado = 'completado';
				state.consulta.error = null;
			})
			.addCase(consultarTickets.rejected, (state, action) => {
				state.consulta.tickets = null;
				state.consulta.estado = 'error';
				state.consulta.error = action.payload;
			})
			.addCase(crearTicket.pending, (state) => {
				state.creacion.numeroTicket = null;
				state.creacion.estado = 'cargando';
				state.creacion.error = null;
			})
			.addCase(crearTicket.fulfilled, (state, action) => {
				state.creacion.numeroTicket = action.payload;
				state.creacion.estado = 'completado';
				state.creacion.error = null;
			})
			.addCase(crearTicket.rejected, (state, action) => {
				state.creacion.numeroTicket = null;
				state.creacion.estado = 'error';
				state.creacion.error = action.payload;
			});
	},
});



export const { limpiarEstadoConsulta, limpiarEstadoCreacion } = ticketsSlice.actions;
export default ticketsSlice.reducer;
