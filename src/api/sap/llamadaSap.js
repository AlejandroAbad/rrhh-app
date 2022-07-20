
export default async function llamadasSap(redux, abortController, metodo, url, body, cabeceras) {

	let urlFedicom = redux.getState().api.urlBase;
	let jwt = redux.getState().api.usuario.datos.jwt;

	if (!cabeceras) cabeceras = {}
	let opciones = {
		method: metodo,
		headers: {
			...cabeceras
		},
		encoding: 'latin1',
	}

	if (abortController) opciones.signal = abortController.signal;
	if (body) opciones.body = body;
	if (jwt) opciones.headers['x-token'] = jwt;


	console.groupCollapsed(opciones.method.toUpperCase() + ' ' + urlFedicom + url);
	console.log(opciones.headers)
	if (body) console.log(body)
	console.groupEnd()

	//return await new Promise(resolve => setTimeout(() => resolve(fetch(urlFedicom + url, opciones)), 100));
	return fetch(urlFedicom + url, opciones);

}


export async function obtenerJson(respuesta, encoding = 'iso-8859-1') {
	const buffer = await respuesta.arrayBuffer();
	const decoder = new TextDecoder(encoding);
	const texto = decoder.decode(buffer);
	return JSON.parse(texto);
}




//export default llamadaSap;