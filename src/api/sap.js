import { autenticar } from "./sap/autenticar";
import { consultaAccesos } from "./sap/consultaAccesos";
import { consultaCatalogo } from "./sap/consultaCatalogo";
import { consultaVales } from "./sap/consultaVales";
import { descargarAlbaranPdf } from "./sap/descargarAlbaranPdf";
import { descargarNominaPdf } from "./sap/descargarNominaPdf";

const SAP = function (R, A) {
	return {
		autenticar: (usuario, password) => autenticar(R, A, usuario, password),
		consultaCatalogo: (patronBusqueda, pagina, limite) => consultaCatalogo(R, A, patronBusqueda, pagina, limite),
		consultaVales: (mes, ano) => consultaVales(R, A, mes, ano),
		descargarAlbaranPdf: (albaran) => descargarAlbaranPdf(R, A, albaran),
		descargarNominaPdf: (mes, ano) => descargarNominaPdf(R, A, mes, ano),
		consultaAccesos: (fecha) => consultaAccesos(R, A, fecha)
	}
}


SAP.generarErrorFetch = (error) => {
	if (Array.isArray(error))
		return error;
	else if (error.message)
		return [{ codigo: 'NET-001', descripcion: `No se pudo alcanzar el servidor: ${error.message}` }]
	else
		return [{ codigo: 'NET-002', descripcion: `No se pudo alcanzar el servidor: ${error}` }]
}

SAP.err2text = (error) => {
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


export default SAP;