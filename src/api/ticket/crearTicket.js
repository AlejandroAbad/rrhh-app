import llamadaTicket from "./llamadaTicket";


export const crearTicket = async (redux, abortController, ticket) => {

	let url = `/api/tickets.json`;
	let respuesta = await llamadaTicket(redux, abortController, 'post', url, ticket);

	let numeroTicket = await respuesta.text();
	if (numeroTicket.match(/^TN-\d{6}$/)) {
		return numeroTicket;
	} else {
		throw numeroTicket;
	}

}
