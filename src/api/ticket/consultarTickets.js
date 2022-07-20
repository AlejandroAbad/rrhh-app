import llamadaTicket from "./llamadaTicket";


export const consultarTickets = async (redux, abortController, emails) => {

	let url = `/api/zticket_list.php?email=${emails.join(',')}`;

	let respuesta = await llamadaTicket(redux, abortController, 'get', url);
	let json = await respuesta.json();
	if (json.token) {
		return {
			jwt: json.token,
			pernr: json.pernr,
			kunnr: parseInt(json.kunnr),
			werks: json.werks_ped
		};
	} else {
		throw json;
	}

}
