import React from 'react';

import { Alert, AlertTitle, Box, Chip, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';

import { useDispatch, useSelector } from 'react-redux';

import TICKET from 'api/tickets';
import { consultarTickets } from 'redux/api/ticketsSlice';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import DialogCrearTicket from './DialogCrearTicket';

const getPrioridadDeEstadoTicket = (estado) => {
	switch (estado) {
		case 'Abierto': return 5;
		case 'Pendiente usuario': return 1;
		case 'En curso': return 4;
		case 'Remitida a proveedor': return 6;
		case 'Resuelto': return 10;
		default: return 3;
	}
}

const getEstiloDeEstadoTicket = (estado) => {
	switch (estado) {
		case 'Abierto': return ['info', estado, 'outlined'];
		case 'Pendiente usuario': return ['warning', 'Requiere su atención', 'outlined'];
		case 'En curso': return ['secondary', estado, 'outlined'];
		case 'Remitida a proveedor': return ['secondary', 'En curso', 'outlined'];
		case 'Resuelto': return ['default', estado, ''];
		default: return ['info', estado, ''];
	}

}

const ChipEstado = ({ estado }) => {
	const [color, texto, variante] = getEstiloDeEstadoTicket(estado);
	return <Chip
		label={texto}
		color={color}
		variant={variante}
		size="small"
		sx={{ py: 1 }}
	/>
}

const LineaTicket = (ticket) => {
	return <Paper sx={{ px: 4, py: 2, mb: 2 }} square >
		<Typography variant="body2" sx={{ mb: 1 }} component="div">
			<ChipEstado estado={ticket.estado} /> el {format(ticket.fechaModificacion, 'dd MMMM yyyy HH:mm', { locale: es })}
		</Typography>
		<a href={ticket.enlace} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
			<Typography variant="h6" component="div" sx={{ color: 'secondary.main' }}>
				{ticket.titulo}
			</Typography>
		</a>
		<Box>
			<Typography variant="body2" component="div">
				{ticket.id} - {ticket.email}
			</Typography>
		</Box>
	</Paper>
}





export default function PantallaTickets() {

	const dispatch = useDispatch();


	const estadoConsultaTickets = useSelector(state => state.tickets.consulta.estado);
	const tickets = useSelector(state => state.tickets.consulta.tickets);
	const error = useSelector(state => state.tickets.consulta.error);

	React.useEffect(() => {
		if (estadoConsultaTickets === 'inicial') {
			dispatch(consultarTickets({ emails: ['alejandro.abad@hefame.es'] }))
		}
	})

	/*
	const [visualizarAlbaran, setVisualizarAlbaran] = React.useState(null);
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
	*/


	const ticketsFiltradosYOrdenados = React.useMemo(() => {

		let fechaReferencia = new Date();
		if (!tickets) return [];
		let mapeo = tickets.map(t => {
			return {
				...t,
				fechaModificacion: parse(t.fechaModificacion, 'dd/MM/yyyy HH:mm:SS', fechaReferencia),
				fechaCreacion: parse(t.fechaCreacion, 'dd/MM/yyyy HH:mm:SS', fechaReferencia)
			}
		})

		let filtrados = mapeo.filter(t => true);

		filtrados.sort((a, b) => {
			let prioA = getPrioridadDeEstadoTicket(a.estado);
			let prioB = getPrioridadDeEstadoTicket(b.estado);
			if (prioA === prioB) {
				return b.fechaModificacion - a.fechaModificacion;
			} else {
				return prioA - prioB;
			}
		})

		return filtrados;

	}, [tickets])


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
			{ticketsFiltradosYOrdenados.map(ticket => {
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
			<Typography>Este es el listado de sus tickets de soporte informático.</Typography>
			<Alert severity='warning' sx={{ mt: 2 }}>
				<AlertTitle>Página de ejemplo</AlertTitle>
				Esta página muestra un ejemplo de cómo quedaría este servicio.
				Por motivos técnicos, el ejemplo siempre muestra tickets creados por <em>alejandro.abad@hefame.es</em>.
			</Alert>
		</Box>

		<Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, my: 2 }}>
			<DialogCrearTicket />
		</Box>

		{contenido}

	</>


}