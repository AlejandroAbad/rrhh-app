import { Alert, Box, Button, Typography } from "@mui/material";

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DownloadIcon from '@mui/icons-material/Download';

export default function PantallaGestionViajesTrabajo() {
	return <>
		<Box sx={{ m: 'auto' }}>
			<Typography variant="h4" sx={{ m: 'auto', mb: 2 }}>Gestión de Viajes de Trabajo</Typography>
		</Box>
		<Box sx={{textAlign: {sm: 'justify'}}}>
			<Typography>
				Si vas a realizar un viaje por motivo de trabajo y vas a necesitar un medio de trasporte y/o alojamiento,
				es posible gestionar el mismo de 2 formas distintas:
				<ul>
					<li><a href="#procedimiento1">Solicitud manual de trasporte/alojamiento</a></li>
					<li><a href="#procedimiento2">A través de la web de El Corte Inglés</a> (Requiere usuario registrado)</li>
				</ul>
			</Typography>

			<Box sx={{ height: { xs: '200px', sm: '300px', md: '300px' }, textAlign: "center" }}>
				<img src="/img/viajes.jpg" alt="Gestión de Viajes" style={{ height: '100%' }} />
			</Box>

			<Typography id="procedimiento1" variant="h5" sx={{ mt: 4, mb: 2 }}>
				Solicitud manual de trasporte/alojamiento
			</Typography>

			<Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
				Paso 1. Cumplimentación del formulario
			</Typography>


			<Typography>
				El viajero o quien habitualmente solicite el viaje, rellenará la Solicitud de
				Transporte y/o Alojamiento.
				Habrá que indicar el nombre y correo electrónico del responsable que autoriza el
				viaje en el campo “Autorizado por”.
			</Typography>

			<Button variant="contained" color="secondary" startIcon={<DownloadIcon />} sx={{ my: 2, mx: 'auto' }}>
				Descargar formulario
			</Button>


			<Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
				Paso 2. Envío de la solicitud
			</Typography>
			<Typography>
				Esta solicitud se remitirá a <strong>hefame@viajeseci.es</strong> con la mayor previsión posible
				con el objetivo de lograr las tarifas más ventajosas y la mayor disponibilidad.
				Siempre que sea posible, se remitirá entre 7 y 10 días antes de iniciar el
				desplazamiento.
			</Typography>

			<Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
				Paso 3. Respuesta de la agencia y del responsable
			</Typography>
			<Typography>
				La agencia de viajes responderá por e-mail a la solicitud lo antes posible,
				proporcionando información sobre la opción más económica de transporte y de
				alojamiento pactada por la empresa.
				Este e-mail se enviará con copia al responsable para su conocimiento y, en su
				caso, autorización. El viaje se entenderá autorizado si no existe respuesta
				contraria del responsable en un plazo de 24 horas.
			</Typography>

			<Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
				Paso 4. Información del desplazamiento
			</Typography>
			<Typography>
				Tras la confirmación por parte del viajero, la agencia tramitará la solicitud,
				enviará la información sobre los costes del viaje y custodiará las notas de cargo
				para la validación posterior de las facturas con el Departamento Financiero.
			</Typography>



			<Typography variant="h5" id="procedimiento2" sx={{ mt: 4, mb: 2 }}>
				Web de reservas de El Corte Inglés.
			</Typography>
			<Alert severity="error" sx={{ my: 2}}>
				¡El enlace no funciona en el actual Portal del emplead@!
			</Alert>
			<Typography>
				La web de El Corte Inglés te permite solicitar billetes de tren/avión y la reserva de hoteles. 
				Es un método rápido y sencillo para aquellas personas que, por la naturaleza de su trabajo, requieren desplazamientos constantes.
			</Typography>
			<Button variant="contained" color="secondary" endIcon={<OpenInNewIcon />} sx={{my: 2, mx: 'auto'}}>
				Reservas en Línea de El Corte Inglés
			</Button>
			<Typography>
				Para acceder al a web es necesario disponer de usuario y password. 
				Si los necesitas y no dispones de ellos, comunícaselo a tu responsable.
			</Typography>




		</Box>
	</>
}