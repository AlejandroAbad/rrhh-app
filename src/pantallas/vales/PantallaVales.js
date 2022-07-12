
import React from "react";
import { Routes, Route } from "react-router-dom";
import PantallaCarrito from "./PantallaCarrito";
import PantallaCatalogo from "./PantallaCatalogo";

export default function PantallaVales() {

	return (<>
		<Routes >
			<Route path="carrito" element={<PantallaCarrito />} />
			<Route path="historico" element={<div>historico</div>} />
			<Route path="*" element={<PantallaCatalogo />} />
		</Routes >
	</>
	)
}