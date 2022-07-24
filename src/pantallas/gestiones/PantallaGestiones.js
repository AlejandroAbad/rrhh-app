
import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Masonry } from "@mui/lab";

import PantallaFarmacuenta from "./PantallaFarmacuenta";
import PantallaGestionViajesTrabajo from "./PantallaGestionViajesTrabajo";
import PantallaJustificacionGastosDesplazamiento from "./PantallaJustificacionGastosDesplazamiento";
import PantallaPlanificadorReuniones from "./PantallaPlanificadorReuniones";
import PantallaReservaVehiculos from "./PantallaReservaVehiculos";

export default function PantallaGestiones() {

	return (<>
		<Routes >
			<Route path="planificador-reuniones" element={<PantallaPlanificadorReuniones />} />

			<Route path="farmacuenta" element={<PantallaFarmacuenta />} />
			<Route path="gestion-viajes-trabajo" element={<PantallaGestionViajesTrabajo />} />
			<Route path="justificacion-gastos" element={<PantallaJustificacionGastosDesplazamiento />} />
			<Route path="reserva-vehiculos" element={<PantallaReservaVehiculos />} />
			
			<Route path="/" element={<PantallaIndiceGestiones />} />
		</Routes >
	</>
	)
}

const PantallaIndiceGestiones = () => {

	const navigate = useNavigate();
	const fnIrA = React.useCallback(destino => {
		navigate(destino);
	}, [navigate])

	return <>
		<Box sx={{ mb: 4 }}>
			<Typography variant="h4" sx={{ m: 'auto', mb: 2 }}>Mis Gestiones</Typography>
		</Box>
		<Masonry columns={{ xs: 1, sm: 2, lg: 3,  }} spacing={2}>

			<Card elevation={3}>
				<CardMedia
					component="img"
					height="140"
					image="/img/reuniones.jpg"
					alt="reuniones"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						Planificación de reuniones
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Planifica tus reuniones de trabajo con esta herramienta. 
						Reserva salas y medios audiovisuales con antelación para que las reuniones
						sean más productivas.
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small" color="secondary" onClick={() => fnIrA('planificador-reuniones')}>
						Acceder
					</Button>
				</CardActions>
			</Card>

			<Card elevation={3}>
				<CardMedia
					component="img"
					height="140"
					image="/img/viajes.jpg"
					alt="viajes"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						Viajes de trabajo
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Si vas a realizar un viaje por motivo de trabajo y vas a necesitar 
						un medio de trasporte y/o alojamiento.
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small" color="secondary" onClick={() => fnIrA('gestion-viajes-trabajo')}>
						Acceder
					</Button>
				</CardActions>
			</Card>

			<Card elevation={3}>
				<CardMedia
					component="img"
					height="140"
					image="/img/gastos.jpg"
					alt="gastos"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						Gastos por desplazamiento
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Aquí puedes encontrar la Normativa aplicable a la justificación de gastos 
						por desplamiento y diestas con ocasión del trabajo. 
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small" color="secondary" onClick={() => fnIrA('justificacion-gastos')}>
						Acceder
					</Button>
				</CardActions>
			</Card>

			<Card elevation={3}>
				<CardMedia
					component="img"
					height="140"
					image="/img/farmacuenta.jpg"
					alt="farmacuenta"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						Farmacuenta
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Farmacuenta tiene un funcionamiento similar a una cuenta corriente bancaria. 
						Todos los empleados/as pueden utilizarla obteniendo ventajosas condiciones y cero comisiones.
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small" color="secondary" onClick={() => fnIrA('farmacuenta')}>
						Acceder
					</Button>
				</CardActions>
			</Card>


			<Card elevation={3}>
				<CardMedia
					component="img"
					height="140"
					image="/img/vehiculo.jpg"
					alt="vehiculo"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						Reserva de Vehículos
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Normativa para la solicitud y uso de un vehículos de empresa.
						Gestión de la reserva de vehículos de empresa.
					</Typography>
				</CardContent>
				<CardActions>
					<Button size="small" color="secondary" onClick={() => fnIrA('reserva-vehiculos')}>
						Acceder
					</Button>
				</CardActions>
			</Card>

		</Masonry>
	</>
}