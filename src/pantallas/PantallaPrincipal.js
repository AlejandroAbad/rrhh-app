import React from "react";
import { Link } from "react-router-dom";


export default function PantallaPrincipal() {

	return (
		<div>
			Pantalla principal
			<nav>
				<Link to="/vales">Vales</Link>
			</nav>
		</div>
	)
}