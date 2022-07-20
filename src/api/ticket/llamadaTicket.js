
export default async function llamadaTicket(redux, abortController, metodo, url, body, cabeceras) {

	let urlBaseTicket = redux.getState().api.urlTicket;

	if (!cabeceras) cabeceras = {}
	let opciones = {
		method: metodo,
		headers: {
			'content-type': 'application/json',
			'x-api-key': '288B139A505AB03728AD44DE2423F730',
			...cabeceras
		},
		
	}

	if (abortController) opciones.signal = abortController.signal;
	if (body) opciones.body = body;

	console.groupCollapsed(opciones.method.toUpperCase() + ' ' + urlBaseTicket + url);
	console.log(opciones.headers)
	if (body) console.log(body)
	console.groupEnd()

	//return await new Promise(resolve => setTimeout(() => resolve(fetch(urlFedicom + url, opciones)), 100));
	return fetch(urlBaseTicket + url, opciones);

}

//export default llamadaSap;