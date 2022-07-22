import llamadaSap, { obtenerJson } from "./llamadaSap";

const tipo2Nombre = (tipo) => {
	switch (parseInt(tipo)) {
		case 9403: return 'Nómina del mes';
		case 9423: return 'Extra de Beneficios';
		case 9433: return 'Extra de Verano';
		case 9443: return 'Extra de Navidad';
		case 9800: return 'Préstamo de empresa';
		default: return 'Desconocido'
	}
}


export const consultarAnticipos = async (redux, abortController, fecha) => {


	let url = `/api/zhr_anticipos_api`;

	let respuesta = await llamadaSap(redux, abortController, 'get', url);
	let json = await obtenerJson(respuesta);

	if (json.t_anticipos) {

		let anticipos = json.t_anticipos.map(anticipo => {
			return {
				nombre: tipo2Nombre(anticipo.tipo),
				disponible: parseFloat(anticipo.disponible),
				concedido: parseFloat(anticipo.concedido),
				pendienteAprobar: parseFloat(anticipo.pendiente_val)
			}
		})

		let prestamos = json.t_prestamo.map(prestamo => {
			return {
				nombre: tipo2Nombre(prestamo.tipo),
				disponible: parseFloat(prestamo.disponible),
				concedido: parseFloat(prestamo.concedido),
				pendienteAprobar: parseFloat(prestamo.pendiente_val),
				pendientePagar: parseFloat(prestamo.pendiente_pagar),
				cuota: parseFloat(prestamo.cuota),
				fechaInicio: prestamo.fecha_ini !== '00000000' ? prestamo.fecha_ini : null,
				fechaFin: prestamo.fecha_fin !== '00000000' ? prestamo.fecha_fin : null,
			}
		})

		return {
			anticipos,
			prestamos
		};
	} else {
		throw json;
	}

}
