import llamadaSap, { obtenerJson } from "./llamadaSap";


export const consultaCatalogo = async (redux, abortController, patronBusqueda, pagina = 1, limit = 50) => {

	let almacen = redux.getState().api.usuario.datos.almacen;
	let consulta = {
		free_find: patronBusqueda
	}

	let url = `/api/zfm_web_materials/buscador/10100868/${almacen}/?query=${JSON.stringify(consulta)}&page=${pagina}&result_page=${limit}`;

	console.log(url)
	let respuesta = await llamadaSap(redux, abortController, 'get', url);


	let json = await obtenerJson(respuesta);

	if (Array.isArray(json)) {
		return json.map(e => {
			return {
				puntuacion: e.rank_value,
				codigo: e.bismt,
				nombre: e.maktx,
				descripcion: e.long_desc,
				stock: e.stock,
				precio: e.pva,
				imagen: e.foto,
			}
		}).sort((a,b) => a.puntuacion < b.puntuacion);
	} else {
		throw json;
	}

}
