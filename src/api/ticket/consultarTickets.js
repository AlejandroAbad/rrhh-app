import llamadaTicket from "./llamadaTicket";


export const consultarTickets = async (redux, abortController, emails) => {

	let url = `/api/zticket_list.php?email=${emails.join(',')}`;

	let respuesta = await llamadaTicket(redux, abortController, 'get', url);
	let json = await respuesta.json();
	if (Array.isArray(json?.tickets)) {
		return json.tickets.map(t => {
			return {
				id: t.number,
				titulo: t.subject,
				fechaCreacion: t.created,
				fechaModificacion: t.updated,
				estado: t.status,
				email: t.email,
				enlace: t.link
			}
		});
	} else {
		throw json;
	}

}
