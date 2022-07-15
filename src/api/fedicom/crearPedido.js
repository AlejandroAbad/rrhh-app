import llamadaFedicom from "./llamadaFedicom";

export const crearPedido = async (redux, abortController, pedido) => {

	let respuesta = await llamadaFedicom(redux, abortController, 'post', '/pedidos', pedido);

	let json = await respuesta.json();
	return json;
}
