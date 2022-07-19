import React from 'react';

// MUI
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

// ICONOS
import InfoIcon from '@mui/icons-material/Info';
import preval from 'preval.macro';


export default function DialogoAcercaDe({ abierto, fnAbrirDialogoApi, fnCerrarDialogoApi }) {

	return <>
		<IconButton onClick={fnAbrirDialogoApi} color="inherit" >
			<InfoIcon />
		</IconButton>
		<Dialog open={abierto} onClose={fnCerrarDialogoApi} fullWidth>
			<DialogContent>
				<Typography variant="h5" component="div">
					App del Emplead@
				</Typography>
				<Typography variant="body1" component="div">
					Grupo HEFAME &copy; 2022
				</Typography>

				<Typography variant="body1" component="div" sx={{mt: 2}}>
					Versión del interfaz web: <strong>v2.0.1</strong>
				</Typography>
				<Typography variant="body1" component="div">
					Fecha de compilación: <strong>{preval`module.exports = new Date().toLocaleString('es-ES');`}</strong>
				</Typography>



			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={fnCerrarDialogoApi}>Cerrar</Button>
			</DialogActions>
		</Dialog>
	</>
}