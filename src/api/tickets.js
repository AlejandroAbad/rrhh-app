import { consultarTickets } from "./ticket/consultarTickets";


const TICKETS = function (R, A) {
	return {
		consultarTickets: (emails) => consultarTickets(R, A, emails)
	}
}


TICKETS.generarErrorFetch = (error) => {
	if (Array.isArray(error))
		return error;
	else if (error.message)
		return [{ codigo: 'NET-001', descripcion: `No se pudo alcanzar el servidor: ${error.message}` }]
	else
		return [{ codigo: 'NET-002', descripcion: `No se pudo alcanzar el servidor: ${error}` }]
}

TICKETS.err2text = (error) => {
	if (!error) return 'Error desconocido (Null)';
	if (Array.isArray(error)) {
		let suberror = error[0];
		if (!suberror) return 'Error desconocido (Lista vacía)';
		if (suberror.message) return String(suberror.message);
		if (suberror.descripcion) return String(suberror.descripcion);
		return String(suberror);
	}

	if (error.message) return String(error.message);
	return String(error);
}

export default TICKETS;