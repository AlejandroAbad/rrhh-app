import { autenticar } from "./sap/autenticar";
import { consultaCatalogo } from "./sap/consultaCatalogo";
import { consultaVales } from "./sap/consultaVales";
import { descargarAlbaranPdf } from "./sap/descargarAlbaranPdf";


const SAP = function (R, A) {
	return {
		autenticar: (usuario, password) => autenticar(R, A, usuario, password),
		consultaCatalogo: (patronBusqueda, pagina, limite) => consultaCatalogo(R, A, patronBusqueda, pagina, limite),
		consultaVales: (mes, ano) => consultaVales(R, A, mes, ano),
		descargarAlbaranPdf: (albaran) => descargarAlbaranPdf(R, A, albaran)
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



export default SAP;