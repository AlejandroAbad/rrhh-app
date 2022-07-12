import { Box, Button, Grid } from "@mui/material";


import React from "react";
import { useNavigate } from "react-router";


export default function PantallaCarrito() {

	const navigate = useNavigate();
	let fnIrCatalogo = React.useCallback(() => {
		navigate('catalogo', { replace: true })
	}, [navigate]);

	return (
		<Box sx={{ flexGrow: 1, mx: 4 }}>
			<Grid container spacing={2}>
				<Grid item xs={11}>
					Le carrito
				</Grid>
				<Grid item xs={1}>
					<Button onClick={fnIrCatalogo}>Volver</Button>
				</Grid>

			</Grid>
		</Box>
	)


}