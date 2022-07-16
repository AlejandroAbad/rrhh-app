
import React from "react";
import { Routes, Route } from "react-router-dom";
import PantallaCarrito from "./PantallaCarrito";
import PantallaCatalogo from "./PantallaCatalogo";
import PantallaConsulta from "./PantallaConsulta";

export default function PantallaVales() {

	return (<>
		<Routes >
			<Route path="carrito" element={<PantallaCarrito />} />
			<Route path="consulta" element={<PantallaConsulta />} />
			<Route path="catalogo" element={<PantallaCatalogo />} />
		</Routes >
	</>
	)
}