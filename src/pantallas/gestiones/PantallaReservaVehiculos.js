import { Box, Typography } from "@mui/material";


export default function PantallaReservaVehiculos() {
	return <>
		<Box sx={{ m: 'auto' }}>
			<Typography variant="h4" sx={{ m: 'auto', mb: 2 }}>Reserva de Vehículos</Typography>
		</Box>
		<Box>
			<Typography sx={{ mb: 2 }}>
				Normativa para la solicitud y uso de un vehículo de empresa.
			</Typography>
			<Box sx={{ height: {xs: '140px', sm: '200px', md: '300px'}, textAlign: "center" }}>
				<img src="/img/vehiculo.jpg" alt="Reserva de Vehículos" style={{ height: '100%' }} />
			</Box>
			<Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
				Objeto
			</Typography>
			<Typography sx={{ mt: 2 }}>
				Para optimizar al máximo el uso de estos vehículos, los trayectos para los que se solicite deberán ser como <strong>mínimo de 200km/día</strong>.
			</Typography>
			<Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
				Realizar la solicitud
			</Typography>
			<Typography sx={{ mt: 2 }}>
				Deberá realizar la solicitud del vehículo utilizando el formulario de esta misma página.
			</Typography>
			<Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
				Recogida del vehículo
			</Typography>
			<Typography sx={{ mt: 2 }}>
				El día de recogida del vehículo se solicitará a Gestión de Flota (ubicación Dpto. Financiero) la llave y las tarjetas (Solred-USC), firmando la entrega en el cuadrante correspondiente.
			</Typography>
			<Typography sx={{ mt: 2 }}>
				Al recoger el vehículo, éste llevará lleno el depósito de combustible y estará limpio (exterior). De no ser así, deberá notificarlo al Gestor de Flota.
			</Typography>
			<Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
				Devolución del vehículo
			</Typography>
			<Typography sx={{ mt: 2 }}>
				La entrega del vehículo deberá hacerse con el depósito de combustible lleno y limpio (exterior). Para ello debe utilizarse la tarjeta Solred.
			</Typography>
			<Typography sx={{ mt: 2 }}>
				El vehículo se recogerá y se dejará estacionado en la zona reservada para vehículos de empresa.
			</Typography>
			<Typography sx={{ mt: 2 }}>
				Se entregará la llave y las tarjetas en Gestión de Flota, indicando los kilómetros que marque el vehículo y se firmará la entrega del mismo.
			</Typography>
			<Typography sx={{ mt: 2 }}>
				El equipo de Gestión de Flotas se reserva la opción de cancelar ante irregularidades.
			</Typography>
		</Box>
	</>
}