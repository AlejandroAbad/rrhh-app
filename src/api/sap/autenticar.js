import llamadaSap, { obtenerJson } from "./llamadaSap";


export const autenticar = async (redux, abortController, usuario, password) => {

	let body = `user=${usuario}&pass=${password}`;
	let headers = {
		'x-user': 'app_portal',
		'x-salt': '1234',
		'x-key': '8500fba4d334ab781a52caab78f3b53d',
		'content-type': 'application/x-www-form-urlencoded'
	}

	let respuesta = await llamadaSap(redux, abortController, 'post', '/api/zhr_login_api/', body, headers);

	let json = await obtenerJson(respuesta);
	
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
