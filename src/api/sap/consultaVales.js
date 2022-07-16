import { endOfMonth, format, parse } from "date-fns";
import llamadaSap, { obtenerJson } from "./llamadaSap";


export const consultaVales = async (redux, abortController, mes, ano) => {

	let empleado = '00' + redux.getState().api.usuario.datos.pernr;
	mes = '00' + (mes + 1);
	mes = mes.substring(mes.length - 2)

	let fechaInicial = parse(`${ano}${mes}01`, 'yyyyMMdd', new Date())
	let fechaFinal = endOfMonth(fechaInicial);

	let url = `/api/zsf_get_order_list/find?date_ini=${format(fechaInicial, 'yyyyMMdd')}&date_end=${format(fechaFinal, 'yyyyMMdd')}&customer=${empleado}&customer_typ=2`;

	let respuesta = await llamadaSap(redux, abortController, 'get', url);


	let json = await obtenerJson(respuesta);

	if (Array.isArray(json)) {

		if (json[0]?.message) {
			if (json[0].id === 5 && json[0].message === "No se han encontrado datos")
				return [];
			throw json;
		}

		return json.map(e => {
			return {
				numeroPedido: e.order,
				numeroAlbaran: e.oproforma,
				fechaAlbaran: e.prof_date,
				fechaCreacion: `${e.order_dat} ${e.order_tim}`,
				precio: Math.max(e.amount_or, e.amount_ne),
				unidades: e.unidades,
				lineas: e.lineas
			}
		}).sort((a, b) => a.numeroAlbaran < b.numeroAlbaran);
	} else {
		throw json;
	}

}
