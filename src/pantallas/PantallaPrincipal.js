import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";


export default function PantallaPrincipal() {

	const navigate = useNavigate();
	const fnIrA = React.useCallback(destino => {
		navigate(destino, { replace: true });
	}, [navigate])

	return (
		<Box sx={{ m: 'auto', mt: 8 }}>

			<Typography variant="h5">Vales de empleado</Typography>
			<Button sx={{ mt: 2 }} type="submit" fullWidth variant="contained" onClick={() => fnIrA('/vales/catalogo')}>
				Crear vale
			</Button>

			<Button sx={{ mt: 2 }} type="submit" fullWidth variant="contained" onClick={() => fnIrA('/vales/consulta')}>
				Consultar vales
			</Button>

			<Typography variant="h5" sx={{mt: 4}}>Nómina</Typography>
			<Button sx={{ mt: 2 }} type="submit" fullWidth variant="contained" onClick={() => fnIrA('/nomina')}>
				Consulta de nómina
			</Button>

		</Box>
	)
}