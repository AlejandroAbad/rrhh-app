
import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import PantallaCarrito from "./PCarrito";
import PantallaCatalogo from "./PCatalogo";

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