import { Container } from "@mui/material";
import {Link } from "react-router-dom";
import React from "react";

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