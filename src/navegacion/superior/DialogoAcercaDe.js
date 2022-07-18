import React from 'react';

// MUI
import Box  from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// ICONOS
import InfoIcon from '@mui/icons-material/Info';
import preval from 'preval.macro';


export default function DialogoAcercaDe({ abierto, fnAbrirDialogoApi, fnCerrarDialogoApi }) {

	return <>
		<IconButton onClick={fnAbrirDialogoApi} color="inherit" >
			<InfoIcon />
		</IconButton>
		<Dialog open={abierto} onClose={fnCerrarDialogoApi} fullWidth>
			<DialogTitle>Fedicom 3</DialogTitle>
			<DialogContent>
				<Box>
					<Typography variant="caption" component="div">
						Versión del interfaz web: <strong>v2.0.1</strong>
					</Typography>
					<Typography variant="caption" component="div">
						Fecha de compilación: <strong>{preval`module.exports = new Date().toLocaleString('es-ES');`}</strong>
					</Typography>
				</Box>


			</DialogContent>
			<DialogActions>
				<Button onClick={fnCerrarDialogoApi}>Cancelar</Button>
			</DialogActions>
		</Dialog>
	</>
}