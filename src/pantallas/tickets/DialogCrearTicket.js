import React from 'react';

import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, useMediaQuery } from "@mui/material";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from '@emotion/react';

import CENTROS_COSTE from './centrosDeCoste';

export default function DialogCrearTicket() {

	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	const [abierto, setAbierto] = React.useState(false);

	return <>
		<Button variant="contained" onClick={() => setAbierto(true)} startIcon={<SupportAgentIcon />}>
			Crear una nueva solicitud
		</Button>
		<Dialog fullScreen={fullScreen} fullWidth maxWidth="lg" open={abierto} onClose={() => setAbierto(false)}		>
			<DialogTitle sx={{ m: 0, mb: 0, py: 1, bgcolor: 'primary.main', color: 'primary.contrastText' }} >
				Crear nueva solicitud de soporte
				<IconButton onClick={() => setAbierto(false)} sx={{ position: 'absolute', right: 8, top: 4, color: (t) => t.palette.grey[800] }}			>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent sx={{ px: 4, mt: 2 }}>

				<TextField
					variant="outlined"
					margin="normal"
					required
					autoFocus
					label="Correo electrónico"
					sx={{ width: { xs: '100%', sm: '42ch' }, mr: 2 }}
				/>
				<TextField
					variant="outlined"
					margin="normal"
					autoFocus
					label="Teléfono"
					sx={{ width: '18ch' }}
				/>
				<Autocomplete
					required
					options={CENTROS_COSTE}
					sx={{ width: { xs: '100%', sm: 400 }, mt: 2 }}
					renderInput={(params) => <TextField {...params} label="Centro de coste *" />}
				/>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					autoFocus
					label="Asunto"

					sx={{ mt: 3 }}
				/>
				<TextField
					label="Descipción"
					required
					fullWidth
					multiline
					rows={5}
					sx={{ mt: 3 }}
				/>
				<Button variant="contained" component="label" color="secondary" sx={{ mt: 2 }} startIcon={<AttachFileIcon />}>
					Adjuntar fichero
					<input hidden accept="*/*" multiple type="file" />
				</Button>

			</DialogContent>
			<DialogActions sx={{ px: 4, mb: 2 }}>
				<Button onClick={() => setAbierto(false)} color="info" startIcon={<CloseIcon />}>Descartar</Button>
				<Button onClick={() => setAbierto(false)} variant="contained" startIcon={<SendIcon />}>Enviar solicitud</Button>
			</DialogActions>
		</Dialog>
	</>
}