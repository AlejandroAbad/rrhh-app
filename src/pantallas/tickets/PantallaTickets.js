import React, { useEffect } from 'react';

import { Alert, AlertTitle, Box, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';

import { useDispatch, useSelector } from 'react-redux';

import TICKET from 'api/tickets';
import { consultarTickets } from 'redux/api/ticketsSlice';




const LineaTicket = (ticket) => {


	return <Paper sx={{ p: 1, mb: 1 }} square >
		{JSON.stringify(ticket)}
	</Paper>
}


export default function PantallaTickets() {

	const dispatch = useDispatch();


	const estadoConsultaTickets = useSelector(state => state.tickets.consulta.estado);
	const tickets = useSelector(state => state.tickets.consulta.tickets);
	const error = useSelector(state => state.tickets.consulta.error);

	useEffect(() => {
		if (estadoConsultaTickets === 'inicial') {
			dispatch(consultarTickets({ emails: ['alejandro.abad@hefame.es'] }))
		}
	})

	/*
	const [visualizarAlbaran, setVisualizarAlbaran] = React.useState(null);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	*/


	let contenido = null;

	if (estadoConsultaTickets === "cargando") {
		contenido = <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 4 }}>
			<CircularProgress size={40} />
			<Typography sx={{ ml: 2, mt: 1 }} variant="h5" component="div">Consultando tickets ...</Typography>
		</Box>
	} else if (error) {
		contenido = <Alert severity="error" >
			<AlertTitle>Ocurrió un error al realizar la consulta</AlertTitle>
			{TICKET.err2text(error)}
		</Alert>
	} else if (tickets?.length > 0) {
		contenido = <Stack sx={{ mt: 2 }}>
			{tickets.map(ticket => {
				return <LineaTicket key={ticket.id} {...ticket} />
			})}
		</Stack>
	} else {
		contenido = <Box sx={{ m: 'auto', textAlign: 'center' }}>
			<div><SentimentNeutralIcon sx={{ width: '60px', height: '60px', color: 'secondary.light' }} /></div>
			<Typography sx={{ ml: 2, mt: 1 }} variant="h5" component="div">Sin resultados</Typography>
		</Box>
	}

	return <>
		<Box sx={{ m: 'auto' }}>
			<Typography variant="h4" sx={{ m: 'auto', mb: 2 }}>Peticiones de Soporte Informático</Typography>
		</Box>

		{contenido}

		{/*
		<Dialog fullScreen={fullScreen} fullWidth maxWidth="lg" open={Boolean(visualizarAlbaran)} onClose={() => setVisualizarAlbaran(false)}		>
			<DialogTitle sx={{ m: 0, mb: 0, py: 1, bgcolor: 'primary.main', color: 'primary.contrastText' }} >
				Vale de empleado: Albarán {visualizarAlbaran?.numeroAlbaran}
				<IconButton
					onClick={() => setVisualizarAlbaran(null)}
					sx={{ position: 'absolute', right: 8, top: 4, color: (t) => t.palette.grey[800] }}
				>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent sx={{ p: 0 }}>
				<iframe
					height="760px"
					width="100%"
					title={`Vale de empleado: Albarán ${visualizarAlbaran?.numeroAlbaran}`}
					src={"data:application/pdf;base64," + visualizarAlbaran?.pdf}
					type="application/pdf"
					style={{ border: 'none' }}
				/>
			</DialogContent>
		</Dialog>
*/}


	</>


}