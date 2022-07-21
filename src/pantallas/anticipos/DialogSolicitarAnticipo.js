import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import PaymentsIcon from '@mui/icons-material/Payments';

import { useTheme } from '@emotion/react';

export default function DialogSolicitarAnticipo() {

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	const [abierto, setAbierto] = React.useState(false);

	return <>
		<Button variant="contained" onClick={() => setAbierto(true)} startIcon={<PaymentsIcon />} sx={{ m: 1 }}>
			Solicitar anticipos
		</Button>
		<Dialog fullScreen={fullScreen} fullWidth maxWidth="lg" open={abierto} onClose={() => setAbierto(false)}		>
			<DialogTitle sx={{ m: 0, mb: 0, py: 1, bgcolor: 'primary.main', color: 'primary.contrastText' }} >
				Solicitar anticipos
				<IconButton onClick={() => setAbierto(false)} sx={{ position: 'absolute', right: 8, top: 4, color: (t) => t.palette.grey[800] }}			>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent sx={{ px: 4, mt: 2 }}>


			</DialogContent>
			<DialogActions sx={{ px: 4, mb: 2 }}>
				<Button onClick={() => setAbierto(false)} color="info" startIcon={<CloseIcon />}>Descartar</Button>
				<Button onClick={() => setAbierto(false)} variant="contained" startIcon={<PaymentsIcon />}>Enviar solicitud</Button>
			</DialogActions>
		</Dialog>
	</>
}